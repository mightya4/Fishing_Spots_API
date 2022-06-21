# Generated by Django 4.0.4 on 2022-06-21 17:31

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='FishingSpots',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='', max_length=255)),
                ('rating', models.DecimalField(decimal_places=1, max_digits=2)),
                ('is_fishing_location', models.BooleanField(default=False)),
                ('has_fished', models.BooleanField(default=False)),
                ('types_of_fish', models.CharField(default='', max_length=255)),
                ('formatted_address', models.CharField(default='', max_length=255)),
                ('latitude', models.IntegerField(default=0)),
                ('longitude', models.IntegerField(default=0)),
                ('place_id', models.CharField(default='', max_length=255)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
