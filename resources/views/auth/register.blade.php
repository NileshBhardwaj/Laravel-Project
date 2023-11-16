<x-guest-layout>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <link href=’https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/ui-lightness/jquery-ui.css’
        rel=’stylesheet’>


    <form method="POST" id="register_form"action="{{ route('register') }}" onclick>
        <!-- @csrf -->
        <!-- <meta name="csrf-token" content="{{ csrf_token() }}"> -->
        <fieldset>
            <!-- Step 1: Name -->
            <!-- <div id="register"><h1>Register</h1></div> -->
            <div id="name-hide" class="mt-4">
                <x-input-label for="name" :value="__('Name')" />
                <x-text-input id="name" class="block mt-1 w-full" type="text" name="name" :value="old('name')"
                    required autofocus autocomplete="name" />
                <x-input-error :messages="$errors->get('name')" class="mt-2" />
            </div>

            <!-- Step 2: Email Address -->
            <div id="email-hide" class="mt-4">
                <x-input-label for="email" :value="__('Email')" />
                <x-text-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')"
                    required autocomplete="username" />
                <span id="email_status" style="
    color: red;
"></span>
                <span id="email_error" style="
    color: red;
"></span>
                <x-input-error :messages="$errors->get('email')" class="mt-2" />
            </div>
            <input type="button" class="next-form btn btn-info" value="Next" />
        </fieldset>
        <fieldset>
            <!-- Step 3: Password -->
            <div id="password-hide" class="mt-4">
                <x-input-label for="password" :value="__('Password')" />

                <x-text-input id="password" class="block mt-1 w-full" type="password" name="password" required
                    autocomplete="new-password" />

                <x-input-error :messages="$errors->get('password')" class="mt-2" />
            </div>

            <!-- Step 4: Confirm Password -->
            <div id="cpassword-hide" class="mt-4">
                <x-input-label for="password_confirmation" :value="__('Confirm Password')" />

                <x-text-input id="password_confirmation" class="block mt-1 w-full" type="password"
                    name="password_confirmation" required autocomplete="new-password" />

                <x-input-error :messages="$errors->get('password_confirmation')" class="mt-2" />
            </div>
            <input type="button" name="previous" class="previous-form btn btn-default" value="Previous" />
            <input type="button" name="next" class="next-form btn btn-info" value="Next" />
        </fieldset>
        <fieldset>
            <!-- Step 5: Address -->


            <div id="address-hide" class="mt-4">
                <x-input-label for="address" :value="__('Address')" />

                <x-text-input id="address" class="block mt-1 w-full" type="text" name="address" required
                    autocomplete="new-address" />

                <x-input-error :messages="$errors->get('address')" class="mt-2" />
            </div>

            <div class="mt-4">
                <x-input-label for="country" :value="__('Country')" />
                <select type="text" name="country" id="country-dropdown" class="block mt-1 w-full"
                    placeholder="Select country ">
                    <option value="">Select Country</option>
                </select>
            </div>
            <div class="mt-4">
                <x-input-label for="state" :value="__('State')" />
                <select type="text" name="state" id="state-dropdown" class="block mt-1 w-full"
                    placeholder="Select state ">
                    <option value="">Select State</option>
                </select>
            </div>
            <div class="mt-4">
                <x-input-label for="city" :value="__('City')" />
                <select type="text" name="city" id="city-dropdown" class="block mt-1 w-full"
                    placeholder="Select city ">
                    <option value="">Select City</option>

                    city_error
                </select>
                <span id="city_error" style="
    color: red;
"></span>
            </div>
            <!-- Navigation Buttons -->
            <input type="button" name="previous" class="previous-form btn btn-default" value="Previous" />
            <input type="button" name="next" class="next-form btn btn-info" value="Next" />
        </fieldset>
        <fieldset>
            <div id="Dob" class="mt-4">
                <x-input-label for="address" :value="__('Date Of Birth')" />

                <x-text-input id="dob" class="block mt-1 w-full" type="date" name="dob" required
                    autocomplete="dob" />

                <span id="dob_error" style="
    color: red;
"></span>
                <x-input-error :messages="$errors->get('address')" class="mt-2" />
            </div>
            <!-- Already Registered? -->
            <div id="hide" class="flex items-center justify-end mt-4">
                <a class="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                    href="{{ route('login') }}">
                    {{ __('Already registered?') }}
                </a>

                <x-primary-button class="ml-4">
                    {{ __('Register') }}
                </x-primary-button>
            </div>
    </form>
    <input type= "button" name="previous" class="previous-form btn btn-default" value="Previous" />
    </fieldset>
</x-guest-layout>

<style>
    #register_form fieldset:not(:first-of-type) {
        display: none;
    }

    /* button, [type=button], [type=reset], [type=submit] {
    -webkit-appearance: button;
    background-color: transparent;
    background-image: none;
    align-items: end;
    margin-top: 13px;
    font-size: 18px;
    background-color: #00800054;
    border: 2px solid #0000000d;
    border-radius: 3px;
    align-items: flex-end;
    margin-left: 87%;
    padding: 4px;
} */
    select#country {
        border-radius: 7px;
    }

    select#state {
        border-radius: 7px;
    }

    select#city {
        border-radius: 7px;
    }

    p {
        color: red;
    }

    .btn {
        display: inline-block;
        margin-bottom: 0;
        margin-top: 6px;
        font-weight: 400;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        -ms-touch-action: manipulation;
        touch-action: manipulation;
        cursor: pointer;
        background-image: none;
        border: 1px solid transparent;
        padding: 1px 12px;
        font-size: 14px;
        line-height: 1.42857143;
        border-radius: 4px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
</style>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>

<script src="{{ asset('js/custom.js') }}"></script>
