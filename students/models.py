# students/models.py

from django.db import models

class Student(models.Model):
    GRADE_CHOICES = [(str(i), f"Grade {i}") for i in range(1, 11)]
    BOARD_CHOICES = [('CBSE', 'CBSE'), ('SSC', 'SSC')]

    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    grade = models.CharField(choices=GRADE_CHOICES, max_length=2)
    board = models.CharField(choices=BOARD_CHOICES, max_length=5)

    parent_name = models.CharField(max_length=100)
    parent_contact_primary = models.CharField(max_length=15)
    parent_contact_secondary = models.CharField(max_length=15, blank=True, null=True)

    admission_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name} - Grade {self.grade} ({self.board})"

class FeeStructure(models.Model):
    grade = models.CharField(choices=Student.GRADE_CHOICES, max_length=2)
    board = models.CharField(choices=Student.BOARD_CHOICES, max_length=5)
    fee_amount = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        unique_together = ('grade', 'board')

    def __str__(self):
        return f"{self.grade} - {self.board} → ₹{self.fee_amount}"

class Payment(models.Model):
    PAYMENT_MODES = [
        ('Cash', 'Cash'),
        ('Cheque', 'Cheque'),
        ('Online', 'Online'),
    ]
    
    PAYMENT_TERMS = [
        ('Term 1', 'Term 1 (Months 1-3)'),
        ('Term 2', 'Term 2 (Months 4-6)'),
        ('Term 3', 'Term 3 (Months 7-9)'),
        ('Term 4', 'Term 4 (Months 10-12)'),
    ]
    
    PAYMENT_STATUS = [
        ('Pending', 'Pending'),
        ('Paid', 'Paid'),
        ('Partial', 'Partial'),
        ('Overdue', 'Overdue'),
    ]

    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    payment_mode = models.CharField(choices=PAYMENT_MODES, max_length=10)
    payment_term = models.CharField(choices=PAYMENT_TERMS, max_length=10)
    payment_status = models.CharField(choices=PAYMENT_STATUS, max_length=10, default='Pending')
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2)
    amount_due = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    transaction_date = models.DateField(auto_now_add=True)
    due_date = models.DateField(null=True, blank=True)
    transaction_id = models.CharField(max_length=100, blank=True, null=True)  # Only if online
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.student.first_name} {self.student.last_name} - {self.payment_term} - ₹{self.amount_paid} ({self.payment_mode})"
    
    def save(self, *args, **kwargs):
        # Auto-calculate amount_due if not set
        if not self.amount_due:
            try:
                fee_structure = FeeStructure.objects.get(
                    grade=self.student.grade,
                    board=self.student.board
                )
                # Each term is 1/4 of the total annual fee
                self.amount_due = fee_structure.fee_amount / 4
            except FeeStructure.DoesNotExist:
                self.amount_due = 0
        
        # Update payment status based on amount paid vs due
        if self.amount_paid >= self.amount_due:
            self.payment_status = 'Paid'
        elif self.amount_paid > 0:
            self.payment_status = 'Partial'
        else:
            self.payment_status = 'Pending'
            
        super().save(*args, **kwargs)
