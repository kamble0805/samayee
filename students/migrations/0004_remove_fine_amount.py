# Generated by Django 5.1.4 on 2025-06-29 00:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('students', '0003_payment_fine_amount_alter_payment_payment_term'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='payment',
            name='fine_amount',
        ),
        migrations.AlterField(
            model_name='payment',
            name='payment_term',
            field=models.CharField(choices=[('Term 1', 'Term 1 (Months 1-3)'), ('Term 2', 'Term 2 (Months 4-6)'), ('Term 3', 'Term 3 (Months 7-9)'), ('Term 4', 'Term 4 (Months 10-12)')], max_length=10),
        ),
    ]
