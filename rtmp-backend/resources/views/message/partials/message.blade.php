<form method="POST" action="/messages/process">
    @csrf
    <input type="hidden" name="id" value="{{ $message->id }}"/>
    <div class="grid grid-cols-5 gap-4 mb-5">
        <div>{{ $message->user->name }}</div>
        <div>{{ $message->body }}</div>
        <div class="text-center">{{ $message->created_at->format('d/m/Y') }}</div>
        <div class="text-center">{{ $message->created_at->format('H:i') }}</div>
        <div class="text-center">
            @if ($message->processed)
                <!-- If processed, show the label -->
                <div class="px-2 py-1 text-xs font-semibold rounded bg-green-200 text-green-800 w-full">
                    Processed
                </div>
            @else
                <!-- If not processed, show the button to mark as processed -->
                <button type="submit" class="px-2 py-1 text-xs font-semibold rounded bg-red-200 text-red-800 w-full">
                    Mark as processed
                </button>
            @endif
        </div>
    </div>
</form>