<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ResetPasswordNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public $token;

    /**
     * Create a new notification instance.
     */
    public function __construct($token)
    {
        $this->token = $token;
        $this->onQueue('mail');
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    protected function resetUrl($notifiable)
    {
        return url(route('password.reset', [
            'token' => $this->token,
            'email' => $notifiable->getEmailForPasswordReset(),
        ], false));
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject(('Notificação de redefinição de senha'))
            ->line(('Você está recebendo este e-mail porque recebemos uma solicitação de redefinição de senha da sua conta.'))
            ->action(('Resetar Senha'), $this->resetUrl($notifiable))
            ->line('Este link de redefinição de senha expirará em ' . config('auth.passwords.' . config('auth.defaults.passwords') . '.expire') . ' minutos.')
            ->line(('Se você não solicitou uma redefinição de senha, nenhuma ação adicional será necessária.'));
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
