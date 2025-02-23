<?php

use Illuminate\Support\Facades\Broadcast;

use App\Models\User;
use App\Models\Message;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

// Authorizing only owners of message to see their own message updates
Broadcast::channel('messages.{messageId}', function (User $user, int $messageId) {
    return $user->id === Message::findOrNew($messageId)->user_id;
});