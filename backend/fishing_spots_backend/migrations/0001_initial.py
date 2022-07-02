# Generated by Django 4.0.5 on 2022-07-02 20:04

import crum
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
                ('rating', models.CharField(default='', max_length=255)),
                ('is_fishing_location', models.BooleanField(default=False)),
                ('has_fished', models.BooleanField(default=False)),
                ('is_favorite', models.BooleanField(default=False)),
                ('types_of_fish', models.CharField(default='', max_length=255)),
                ('formatted_address', models.CharField(default='', max_length=255)),
                ('lat', models.CharField(default='', max_length=255)),
                ('lng', models.CharField(default='', max_length=255)),
                ('place_id', models.CharField(default='', max_length=255)),
                ('user', models.ForeignKey(default=crum.get_current_user, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
