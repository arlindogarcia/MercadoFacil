<?php

return [
    'backup' => [
        'name' => env('APP_NAME', 'mercado-facil'),

        'source' => [
            'files' => [
                'include' => [],
                'exclude' => [],
                'follow_links' => false,
                'ignore_unreadable_dirs' => false,
                'relative_path' => null,
            ],
            'databases' => ['mysql'],
        ],

        'database_dump_compressor' => Spatie\DbDumper\Compressors\GzipCompressor::class,
        'database_dump_file_extension' => '',

        'destination' => [
            'filename_prefix' => '',
            'disks' => ['backup'],
        ],

        'temporary_directory' => storage_path('app/backup-temp'),
        'password' => env('BACKUP_ARCHIVE_PASSWORD'),
        'encryption' => 'default',
        'tries' => 1,
        'retry_delay' => 0,
    ],

    'notifications' => [
        'notifiable' => Spatie\Backup\Notifications\Notifiable::class,
        'notifications' => [
            Spatie\Backup\Notifications\Notifications\BackupHasFailed::class => ['mail'],
            Spatie\Backup\Notifications\Notifications\UnhealthyBackupWasFound::class => ['mail'],
            Spatie\Backup\Notifications\Notifications\CleanupHasFailed::class => ['mail'],
            Spatie\Backup\Notifications\Notifications\BackupWasSuccessful::class => [],
            Spatie\Backup\Notifications\Notifications\HealthyBackupWasFound::class => [],
            Spatie\Backup\Notifications\Notifications\CleanupWasSuccessful::class => [],
        ],
        'mail' => [
            'to' => env('BACKUP_NOTIFY_EMAIL', env('MAIL_FROM_ADDRESS')),
            'from' => [
                'address' => env('MAIL_FROM_ADDRESS'),
                'name' => env('MAIL_FROM_NAME'),
            ],
        ],
        'slack' => ['webhook_url' => '', 'channel' => null, 'username' => null, 'icon' => null],
        'discord' => ['webhook_url' => '', 'username' => 'Backup', 'avatar_url' => ''],
    ],

    'monitor_backups' => [
        [
            'name' => env('APP_NAME', 'mercado-facil'),
            'disks' => ['backup'],
            'health_checks' => [
                Spatie\Backup\Tasks\Monitor\HealthChecks\MaximumAgeInDays::class => 2,
                Spatie\Backup\Tasks\Monitor\HealthChecks\MaximumStorageInMegabytes::class => 5000,
            ],
        ],
    ],

    'cleanup' => [
        'strategy' => Spatie\Backup\Tasks\Cleanup\Strategies\DefaultStrategy::class,
        'default_strategy' => [
            'keep_all_backups_for_days' => 7,
            'keep_daily_backups_for_days' => 7,
            'keep_weekly_backups_for_weeks' => 4,
            'keep_monthly_backups_for_months' => 3,
            'keep_yearly_backups_for_years' => 1,
            'delete_oldest_backups_when_using_more_megabytes_than' => 5000,
        ],
        'tries' => 3,
        'retry_delay' => 30,
    ],
];
