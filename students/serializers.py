from rest_framework import serializers
from django.db.models import Sum
from .models import Student, FeeStructure, Payment

class StudentSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    total_paid = serializers.SerializerMethodField()
    fee_structure = serializers.SerializerMethodField()
    
    class Meta:
        model = Student
        fields = [
            'id', 'first_name', 'last_name', 'full_name', 'grade', 'board',
            'parent_name', 'parent_contact_primary', 'parent_contact_secondary',
            'admission_date', 'total_paid', 'fee_structure'
        ]
    
    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"
    
    def get_total_paid(self, obj):
        total = Payment.objects.filter(student=obj).aggregate(
            total=Sum('amount_paid')
        )['total']
        return total or 0
    
    def get_fee_structure(self, obj):
        try:
            fee_structure = FeeStructure.objects.get(grade=obj.grade, board=obj.board)
            return {
                'id': fee_structure.id,
                'fee_amount': fee_structure.fee_amount
            }
        except FeeStructure.DoesNotExist:
            return None

class FeeStructureSerializer(serializers.ModelSerializer):
    grade_display = serializers.CharField(source='get_grade_display', read_only=True)
    board_display = serializers.CharField(source='get_board_display', read_only=True)
    
    class Meta:
        model = FeeStructure
        fields = ['id', 'grade', 'grade_display', 'board', 'board_display', 'fee_amount']

class PaymentSerializer(serializers.ModelSerializer):
    student_name = serializers.SerializerMethodField()
    student_grade = serializers.CharField(source='student.grade', read_only=True)
    payment_mode_display = serializers.CharField(source='get_payment_mode_display', read_only=True)
    payment_term_display = serializers.CharField(source='get_payment_term_display', read_only=True)
    payment_status_display = serializers.CharField(source='get_payment_status_display', read_only=True)
    
    class Meta:
        model = Payment
        fields = [
            'id', 'student', 'student_name', 'student_grade', 'payment_mode', 
            'payment_mode_display', 'payment_term', 'payment_term_display', 
            'payment_status', 'payment_status_display', 'amount_paid', 'amount_due',
            'transaction_date', 'due_date', 'transaction_id', 'notes'
        ]
    
    def get_student_name(self, obj):
        return f"{obj.student.first_name} {obj.student.last_name}"
