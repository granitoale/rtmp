<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\View\View;
use Illuminate\Http\RedirectResponse;
use App\Events\MessageProcessed;

class MessageController extends Controller implements \Illuminate\Routing\Controllers\HasMiddleware{

    // Apply the 'auth:sanctum' middleware to all methods in this controller
    public static function middleware(): array{
        return [
            new Middleware(middleware: 'auth:sanctum')
        ];
    }

    // Show all messages and their status
    public function index(): View{
        
        if (Auth::user()->cannot('viewAny', Message::class)) {
            abort(403);
        }

        return view('message.index', [
            'messages' => Message::orderBy('id', 'desc')->paginate(10)
        ]);
    }

    // POST: Store a new message, exposed to api/message/store
    public function store(Request $request){

        $request->validate([
            'body' => 'required|string|max:50'
        ]);

        $message = Message::create([
            'user_id' => Auth::id(),
            'body' => $request->body
        ]);

        return response()->json($message, 201);
    }

    // Set a message as processed
    public function process(Request $request): RedirectResponse{

        if (Auth::user()->cannot('update', Message::class)) {
            abort(403);
        }

        $request->validate([
            'id' => 'required|int'
        ]);

        $message = Message::find($request->input('id'));
        $message->processed = 1;
        $message->save();

        MessageProcessed::dispatch($message);

        return back();
    }

    // Get users's pending messages IDs
    public function getUserPendingMessagesIds(){
        $messages = Message::all()->where('user_id',Auth::id())->where('processed', 0);
        return response()->json($messages, 201);
    }

}
