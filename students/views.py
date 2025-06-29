from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Sum, Q
from .models import Student, FeeStructure, Payment
from .serializers import StudentSerializer, FeeStructureSerializer, PaymentSerializer

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    @action(detail=False, methods=['get'])
    def search(self, request):
        """Search students by name, grade, or board"""
        query = request.query_params.get('q', '').strip()
        
        if not query:
            return Response([])
        
        # Search in first_name, last_name, parent_name, grade, and board
        queryset = self.queryset.filter(
            Q(first_name__icontains=query) |
            Q(last_name__icontains=query) |
            Q(parent_name__icontains=query) |
            Q(grade__icontains=query) |
            Q(board__icontains=query)
        )
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def payments(self, request, pk=None):
        """Get all payments for a specific student"""
        student = self.get_object()
        payments = Payment.objects.filter(student=student).order_by('-transaction_date')
        serializer = PaymentSerializer(payments, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def payment_summary(self, request, pk=None):
        """Get payment summary for a specific student"""
        student = self.get_object()
        total_paid = Payment.objects.filter(student=student).aggregate(
            total=Sum('amount_paid')
        )['total'] or 0
        
        # Get fee structure for this student
        try:
            fee_structure = FeeStructure.objects.get(
                grade=student.grade, 
                board=student.board
            )
            total_fee = fee_structure.fee_amount
        except FeeStructure.DoesNotExist:
            total_fee = 0
        
        return Response({
            'student': StudentSerializer(student).data,
            'total_fee': total_fee,
            'total_paid': total_paid,
            'balance': total_fee - total_paid
        })

class FeeStructureViewSet(viewsets.ModelViewSet):
    queryset = FeeStructure.objects.all()
    serializer_class = FeeStructureSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    @action(detail=False, methods=['get'])
    def by_grade_board(self, request):
        """Get fee structure by grade and board"""
        grade = request.query_params.get('grade')
        board = request.query_params.get('board')
        
        if grade and board:
            queryset = self.queryset.filter(grade=grade, board=board)
        else:
            queryset = self.queryset
            
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def create(self, request, *args, **kwargs):
        """Override create to return payment summary after creation"""
        response = super().create(request, *args, **kwargs)
        
        # Get the created payment
        payment = Payment.objects.get(id=response.data['id'])
        student = payment.student
        
        # Calculate payment summary
        total_paid = Payment.objects.filter(student=student).aggregate(
            total=Sum('amount_paid')
        )['total'] or 0
        
        # Get fee structure for this student
        try:
            fee_structure = FeeStructure.objects.get(
                grade=student.grade, 
                board=student.board
            )
            total_fee = fee_structure.fee_amount
        except FeeStructure.DoesNotExist:
            total_fee = 0
        
        # Add summary to response
        response.data['payment_summary'] = {
            'student_name': f"{student.first_name} {student.last_name}",
            'total_fee': total_fee,
            'total_paid': total_paid,
            'balance_due': total_fee - total_paid,
            'term_fee': total_fee / 4,
            'current_term': payment.payment_term,
            'amount_just_paid': payment.amount_paid
        }
        
        return response
    
    @action(detail=False, methods=['get'])
    def summary(self, request):
        """Get payment summary statistics"""
        total_payments = Payment.objects.count()
        total_amount = Payment.objects.aggregate(
            total=Sum('amount_paid')
        )['total'] or 0
        
        # Payments by mode
        payments_by_mode = {}
        for mode, _ in Payment.PAYMENT_MODES:
            amount = Payment.objects.filter(payment_mode=mode).aggregate(
                total=Sum('amount_paid')
            )['total'] or 0
            payments_by_mode[mode] = amount
        
        return Response({
            'total_payments': total_payments,
            'total_amount': total_amount,
            'payments_by_mode': payments_by_mode
        })
    
    @action(detail=True, methods=['get'])
    def student_summary(self, request, pk=None):
        """Get payment summary for the student of this payment"""
        payment = self.get_object()
        student = payment.student
        
        total_paid = Payment.objects.filter(student=student).aggregate(
            total=Sum('amount_paid')
        )['total'] or 0
        
        # Get fee structure for this student
        try:
            fee_structure = FeeStructure.objects.get(
                grade=student.grade, 
                board=student.board
            )
            total_fee = fee_structure.fee_amount
        except FeeStructure.DoesNotExist:
            total_fee = 0
        
        return Response({
            'student_name': f"{student.first_name} {student.last_name}",
            'total_fee': total_fee,
            'total_paid': total_paid,
            'balance_due': total_fee - total_paid,
            'term_fee': total_fee / 4,
            'current_payment': PaymentSerializer(payment).data
        })
