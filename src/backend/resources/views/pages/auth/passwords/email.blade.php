@extends('layouts.auth')

@section('title')
    | Lupa Kata Sandi
@endsection

@section('content')
    @if (session('status'))
        <div class="alert alert-success">
            {{ session('status') }}
        </div>
    @endif
    
    <p class="login-box-msg">Silahkan masukkan email akun anda.</p>

    <form action="{{ route('password.email') }}" method="post">
        @csrf
        <div class="input-group mb-3">
            <input type="email" 
                class="form-control" 
                placeholder="Email" 
                name="email"
                autofocus 
                required>
            <div class="input-group-append">
            <div class="input-group-text">
                <span class="fas fa-envelope"></span>
            </div>
            </div>
        </div>
        @error('email')
            <small class="mt-n3 d-block text-danger">
                <strong>{{ $message }}</strong>
            </small>
        @enderror
        <div class="row">
            <div class="col-12">
            <button type="submit" class="btn btn-primary btn-block">Kirim Permintaan</button>
            </div>
            <!-- /.col -->
        </div>
    </form>

    <p class="mt-3 mb-1">
    <a href="{{ route('login') }}">Login</a>
    </p>
@endsection