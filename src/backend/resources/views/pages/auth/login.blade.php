@extends('layouts.auth')

@section('title')
    | Masuk
@endsection

@section('content')
    <p class="login-box-msg">Silahkan masukkan akun untuk memulai aplikasi.</p>

    <form action="{{ route('login') }}" method="post">
        @csrf
        <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Username" name="username" required>
            <div class="input-group-append">
                <div class="input-group-text">
                <span class="fas fa-user"></span>
                </div>
            </div>
        </div>
        @error('username')
            <small class="mt-n3 d-block text-danger">
                <strong>{{ $message }}</strong>
            </small>
        @enderror
        <div class="input-group mb-3">
            <input type="password" class="form-control" placeholder="Password" name="password" required>
            <div class="input-group-append">
                <div class="input-group-text">
                <span class="fas fa-lock"></span>
                </div>
            </div>
        </div>
        @error('password')
            <small class="mt-n3 d-block text-danger">
                <strong>{{ $message }}</strong>
            </small>
        @enderror
        <div class="row">
        <div class="col-8">
            <div class="icheck-primary">
            <input type="checkbox" 
                id="remember" 
                name="remember"
                {{ old('remember') ? 'checked' : '' }}>
            <label for="remember">
                Remember Me
            </label>
            </div>
        </div>
        <!-- /.col -->
        <div class="col-4">
            <button type="submit" class="btn btn-primary btn-block">Masuk</button>
        </div>
        <div class="col-12">
            <p class="mb-1">
                <a href="{{ route('password.request') }}">Lupa kata sandi ?</a>
            </p>
        </div>
        <!-- /.col -->
        </div>
    </form>
@endsection