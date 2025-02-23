<?php

namespace App\Policies;

use App\Models\Message;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class MessagePolicy
{
    /**
     * Determine whether the user can view any models.
     * Only admin users can view all models.
     */
    public function viewAny(User $user): bool{
        return $user->admin == true;
    }

    /**
     * Determine whether the user can update the model.
     * Only admin users can update messages.
     */
    public function update(User $user): bool{
        return $user->admin == true;
    }
}
