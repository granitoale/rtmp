<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Messages') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900 dark:text-gray-100">
                    <div class="grid grid-cols-5 gap-4 mb-5 pb-5 border-b">
                      <div>User</div>
                      <div>Message</div>
                      <div class="text-center">Date</div>
                      <div class="text-center">Time</div>
                      <div class="text-center">Status</div>
                    </div>
                    @foreach ($messages as $message)
                        @include('message.partials.message',['message' => $message])
                    @endforeach
                </div>
            </div>
        </div>
    </div>

    @if ($messages->hasPages())
        <div class="mb-5">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6 text-gray-900 dark:text-gray-100">
                        {{ $messages->links() }}
                    </div>
                </div>
            </div>
        </div>
    @endif

</x-app-layout>
