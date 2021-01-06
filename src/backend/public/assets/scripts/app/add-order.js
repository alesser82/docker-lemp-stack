let orderDetail = [],
  orderForm = false;

function initOrderDetail() {
  if (!lsTest() || !ADD_ORDER_PAGE) {
    return false;
  }

  orderDetail = localStorage.getItem(LS_ORDER_NAME);

  if (typeof orderDetail !== 'string') {
    orderDetail = [];
    return true;
  }

  orderDetail = JSON.parse(orderDetail);

  initOrderDetailTable();

  return true;

}

function initOrderDetailTable() {

  let orderTotal = 0,
    orderQuantity = 0;

  $('#order-detail-table').addClass('d-none');
  $('.btn-block').attr('disabled', true);
  orderForm = false;

  if (orderDetail.length < 1) {
    return true;
  }

  $('#order-detail-table').removeClass('d-none');

  $('#order-detail-table tbody').empty();

  $.each(orderDetail, (key, value) => {

    orderTotal += parseInt(value.product_price);
    orderQuantity += parseInt(value.product_quantity);

    $('#order-detail-table tbody').append(`
      <tr class="text-center" 
        data-id="${value.product_id}">
        <td class="align-middle">${key + 1}</td>
        <td class="align-middle order-product-name" width="200">${value.product_name}</td>
        <td class="align-middle">
            <input type="hidden"
              value="${value.product_id}"
              name="order_detail[${key}][product_id]"
              class="order-product-id" />
              <div class="d-flex mx-auto justify-content-center" style="width: 50px">
                <input type="text" 
                  class="form-control mx-auto w-100 text-center py-0 order-product-qty" 
                  value="${value.product_quantity}" 
                  data-id="${value.product_id}"
                  name="order_detail[${key}][quantity]">
              </div>
        </td>
        <td class="align-middle">
          <div class="d-flex mx-auto justify-content-center" style="width: 125px">
            <input type="text" 
              class="form-control mx-auto w-100 py-0 order-product-price text-center" 
              value="${value.product_price}" 
              data-id="${value.product_id}"
              name="order_detail[${key}][total]">
          </div>
        </td>
        <td class="align-middle">
            <button type="button" 
              class="btn btn-sm btn-danger order-product-delete"
              title="Hapus"
              data-id="${value.product_id}">
                <i class="fas fa-times"></i>
            </button>
        </td>
      </tr>
    `);

  });

  $('#add-order-total-text').text(`Rp${formatRupiah(orderTotal)}`);

  $('input[name="order[total]"]').val(orderTotal);
  $('input[name="order[quantity]"]').val(orderQuantity);

  $('.btn-block').attr('disabled', false);

  orderForm = true;

}

function inputOrderProductDetailChange() {

  let productNameElements = $('#order-detail-table').find('.order-product-name'),
    productIdElements = $('#order-detail-table').find('.order-product-id'),
    productQuantityElements = $('#order-detail-table').find('.order-product-qty'),
    productPriceElements = $('#order-detail-table').find('.order-product-price');

  $.each(orderDetail, (key, value) => {
    orderDetail[key].product_id = productIdElements.eq(key).val();
    orderDetail[key].product_name = productNameElements.eq(key).text();
    orderDetail[key].product_quantity = productQuantityElements.eq(key).val();
    orderDetail[key].product_price = productPriceElements.eq(key).val();
  });

  resetLsOrderDetail();

  initOrderDetailTable();

}

function addOrderDetail() {

  if (parseFloat(getLsSize().total) > 4500) {
    $('#ls-over').removeClass('d-none');
    return true;
  }

  $('#ls-over').addClass('d-none');

  let formValue = getOrderAddFormValue();

  if (parseInt(formValue.product_stock) < parseInt(formValue.product_quantity)) {
    $('#ls-over').removeClass('d-none');
    return false;
  }

  if (orderDetail.length > 0) {
    updateOrderDetail(formValue);
  } else {
    orderDetail.push(formValue);
  }

  resetLsOrderDetail();

  initOrderDetailTable();

}

function resetLsOrderDetail() {
  localStorage.removeItem(LS_ORDER_NAME);
  localStorage.setItem(LS_ORDER_NAME, JSON.stringify(orderDetail));
}

function updateOrderDetail(formValue) {

  let update = false;

  $.each(orderDetail, (key, value) => {
    if (value.product_id === formValue.product_id) {

      orderDetail[key].product_quantity = 
        parseInt(formValue.product_quantity) + 
        parseInt(orderDetail[key].product_quantity);

      orderDetail[key].product_price = 
        parseInt(formValue.product_price) + 
        parseInt(orderDetail[key].product_price);

      update = true;

    }

  });

  if (!update) {
    orderDetail.push(formValue);
  }

}

function getOrderAddFormValue() {
  return {
    'product_id': 
      $('#order-product-form')
        .find('.select2bs4')
        .children('option:selected')
        .val(),
    'product_price': 
      $('#order-product-form')
        .find('.select2bs4')
        .children('option:selected')
        .attr('data-price'),
    'product_name': 
      $('#order-product-form')
        .find('.select2bs4')
        .children('option:selected')
        .attr('data-name'),
    'product_stock': 
      $('#order-product-form')
        .find('.select2bs4')
        .children('option:selected')
        .attr('data-stock'),
    'product_quantity':
      $('#order-product-form')
        .find('.text-center')
        .val(),
  };
}

function deleteOrderDetail(button) {
  
  $.each(orderDetail, (key, value) => {

    if (value.product_id === button.attr('data-id')) {
      orderDetail.splice(key, 1);
    }

  });

  resetLsOrderDetail();

  initOrderDetailTable();

}

function deleteAllOrderDetail() {
  orderDetail = [];

  resetLsOrderDetail();

  initOrderDetailTable();
}

function destroyOrderDetailTable() {
  $("order-detail-table").addClass('d-none');
}

$(document).ready(() => {

  if (!lsTest()) {
    $('#ls-alert').removeClass('d-none');
  }

  const ORDER_PAGE_READY = initOrderDetail();

  $('#order-product-form').submit(function (e) {
    e.preventDefault();

    if (ORDER_PAGE_READY) {
      addOrderDetail();
    }
  });

  $('#order-detail-table').on('click', '.order-product-delete', function (e) {

    e.preventDefault();
  
    if (ORDER_PAGE_READY) {
      deleteOrderDetail($(this));
    }

  });

  $('#order-detail-table').on('click', '#delete-all-orders', function (e) {

    e.preventDefault();
  
    if (ORDER_PAGE_READY) {
      deleteAllOrderDetail();
    }

  });

  $('#order-detail-table').on('change', '.order-product-qty', function (e) {
  
    if (ORDER_PAGE_READY) {

      if (parseInt($(this).val()) < 1 || $(this).val() === '' || isNaN(parseInt($(this).val()))) {
        $(this).val('1');
      } else {
        $(this).val(parseInt($(this).val()));
      }

      inputOrderProductDetailChange();
    }

  });

  $('#order-detail-table').on('change', '.order-product-price', function (e) {
  
    if (ORDER_PAGE_READY) {

      if (parseInt($(this).val()) < 0 || $(this).val() === '' || isNaN(parseInt($(this).val()))) {
        $(this).val('0');
      } else {
        $(this).val(parseInt($(this).val()));
      }

      inputOrderProductDetailChange();
    }

  });

  $('#add-order-form').submit(function (e) {
    if (!orderForm) {
      e.preventDefault();
    }
  });

});