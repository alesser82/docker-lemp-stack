<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

final class Index extends Controller
{

    const VIEW_PATH = 'pages.dashboard.index';

    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $data['purchaseTotal'] = $this->getPurchaseTotal();
        $data['orderTotal'] = $this->getOrderTotal();
        $data['productTotal'] = $this->getProductTotal();
        $data['emptyStockTotal'] = $this->getEmptyStockTotal();

        return view(self::VIEW_PATH, $data);
    }

    /**
     * Get total of purchase table
     *
     * @return integer
     */
    private function getPurchaseTotal()
    {
        return DB::table('purchases')
                ->count();
    }

    /**
     * Get total of order table
     *
     * @return integer
     */
    private function getOrderTotal()
    {
        return DB::table('orders')
                ->count();
    }

    /**
     * Get total of product table
     *
     * @return integer
     */
    private function getProductTotal()
    {
        return DB::table('products')
                ->count();
    }

    /**
     * Get total of empty stock product
     *
     * @return integer
     */
    private function getEmptyStockTotal()
    {
        return $this->additionEmptyStock(

            // Get all purchase quantity by product
            DB::table('purchase_details')
                ->select(DB::raw('count(quantity) as total, product_id'))
                ->groupBy('product_id')
                ->get(),

            // Get all order quantity by product
            DB::table('order_details')
                ->select(DB::raw('count(quantity) as total, product_id'))
                ->groupBy('product_id')
                ->get()

        );
    }

    /**
     * Handling addition empty stock
     *
     * @param [array] $purchases
     * @param [array] $order
     * @return void
     */
    private function additionEmptyStock($purchases, $order)
    {
        if ( empty($purchases) || empty($orders) ) {
            return 0;
        }

        $total = 0;

        foreach ($purchases as $purchaseValue) {

            foreach ($orders as $orderValue) {

                if ( $purchaseValue->product_id === $orderValue->product_id ) {

                    if ( ( $purchaseValue->total - $orderValue->total ) === 0 ) {
                        $total++;
                    }

                }

            }

        }

        return $total;
    }

}
