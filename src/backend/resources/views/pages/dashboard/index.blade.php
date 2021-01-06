@extends('layouts.dashboard')

@section('title')
    | Dashboard
@endsection

@section('header-section')
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0 text-dark">Dashboard</h1>
            </div>
            <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                {{-- <li class="breadcrumb-item"><a href="#">Home</a></li> --}}
                <li class="breadcrumb-item active">Dashboard</li>
                </ol>
            </div>
            </div>
        </div>
    </div>
@endsection

@section('content-section')
    <div class="container-fluid" id="dashboard-content">
        <!-- Small boxes (Stat box) -->
        <div class="row">
            <div class="col-lg-3 col-6">
                <!-- small box -->
                <div class="small-box bg-info">
                <div class="inner">
                    <h3>{{ $orderTotal }}</h3>

                    <p>Pemasukkan</p>
                </div>
                <div class="icon">
                    <i class="ion ion-bag"></i>
                </div>
                </div>
            </div>
            <!-- ./col -->
            <div class="col-lg-3 col-6">
                <!-- small box -->
                <div class="small-box bg-success">
                <div class="inner">
                    <h3>{{ $purchaseTotal }}</h3>

                    <p>Pengeluaran</p>
                </div>
                <div class="icon">
                    <i class="ion ion-ios-arrow-thin-left"></i>
                </div>
                </div>
            </div>
            <!-- ./col -->
            <div class="col-lg-3 col-6">
                <!-- small box -->
                <div class="small-box bg-warning">
                <div class="inner">
                    <h3>{{ $productTotal }}</h3>
                    <p>Total Barang</p>
                </div>
                <div class="icon">
                    <i class="ion ion-battery-full"></i>
                </div>
                </div>
            </div>
            <!-- ./col -->
            <div class="col-lg-3 col-6">
                <!-- small box -->
                <div class="small-box bg-danger">
                <div class="inner">
                    <h3>{{ $emptyStockTotal }}</h3>
                    <p>Stok Kosong</p>
                </div>
                <div class="icon">
                    <i class="ion ion-battery-empty"></i>
                </div>
                </div>
            </div>
        <!-- ./col -->
        </div>
        <!-- /.row -->

        <!-- Chart -->
        <div class="row">
            <!-- Brand Column -->
            <div class="col-lg-6">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Total Barang Berdasarkan Brand</h3>
                    </div>
                    <div class="card-body">
                        <div class="chart">
                            <canvas id="brand-chart" style="height:230px; min-height:230px"></canvas>
                        </div>
                    </div>
                    <!-- /.card-body -->
                </div>
            </div>

            <!-- Category Column -->
            <div class="col-lg-6">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Total Barang Berdasarkan Kategori</h3>
                    </div>
                    <div class="card-body">
                        <div class="chart">
                            <canvas id="category-chart" style="height:230px; min-height:230px"></canvas>
                        </div>
                    </div>
                    <!-- /.card-body -->
                </div>
            </div>
        </div>

    </div>
    <!-- /.container-fluid -->
@endsection