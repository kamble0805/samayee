from django.contrib import admin
from .models import Student, FeeStructure, Payment

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'grade', 'board', 'parent_name', 'parent_contact_primary', 'admission_date']
    list_filter = ['grade', 'board', 'admission_date']
    search_fields = ['first_name', 'last_name', 'parent_name', 'parent_contact_primary']
    ordering = ['first_name', 'last_name']

@admin.register(FeeStructure)
class FeeStructureAdmin(admin.ModelAdmin):
    list_display = ['grade', 'board', 'fee_amount']
    list_filter = ['grade', 'board']
    search_fields = ['grade', 'board']

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ['student', 'payment_mode', 'amount_paid', 'transaction_date']
    list_filter = ['payment_mode', 'transaction_date']
    search_fields = ['student__first_name', 'student__last_name', 'transaction_id']
    ordering = ['-transaction_date']
