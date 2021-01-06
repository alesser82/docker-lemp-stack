let purchaseDetail = [],
  purchaseForm = false;

function initPurchaseDetail() {
  if (!lsTest() || !ADD_PURCHASE_PAGE) {
    return false;
  }

  purchaseDetail = localStorage.getItem(LS_PURCHASE_NAME);

  if (typeof purchaseDetail !== 'string') {
    purchaseDetail = [];
    return true;
  }

  purchaseDetail = JSON.parse(purchaseDetail);

  initPurchaseDetailTable();

  return true;

}

function initPurchaseDetailTable() {

  let purchaseTotal = 0,
    purchaseQuantity = 0;

  $('#purchase-detail-table').addClass('d-none');
  $('.btn-block').attr('disabled', true);
  purchaseForm = false;

  if (purchaseDetail.length < 1) {
    return true;
  }

  $('#purchase-detail-table').removeClass('d-none');

  $('#purchase-detail-table tbody').empty();

  $.each(purchaseDetail, (key, value) => {

    purchaseTotal += parseInt(value.product_price);
    purchaseQuantity += parseInt(value.product_quantity);

    $('#purchase-detail-table tbody').append(`
      <tr class="text-center" 
        data-id="${value.product_id}">
        <td class="align-middle">${key + 1}</td>
        <td class="align-middle purchase-product-name" width="200">${value.product_name}</td>
        <td class="align-middle">
            <input type="hidden"
              value="${value.product_id}"
              name="purchase_detail[${key}][product_id]"
              class="purchase-product-id" />
              <div class="d-flex mx-auto justify-content-center" style="width: 50px">
                <input type="text" 
                  class="form-control mx-auto w-100 text-center py-0 purchase-product-qty" 
                  value="${value.product_quantity}" 
                  data-id="${value.product_id}"
                  name="purchase_detail[${key}][quantity]">
              </div>
        </td>
        <td class="align-middle">
          <div class="d-flex mx-auto justify-content-center" style="width: 125px">
            <input type="text" 
              class="form-control mx-auto w-100 py-0 purchase-product-price text-center" 
              value="${value.product_price}" 
              data-id="${value.product_id}"
              name="purchase_detail[${key}][total]">
          </div>
        </td>
        <td class="align-middle">
            <button type="button" 
              class="btn btn-sm btn-danger purchase-product-delete"
              title="Hapus"
              data-id="${value.product_id}">
                <i class="fas fa-times"></i>
            </button>
        </td>
      </tr>
    `);

  });

  $('#add-purchase-total-text').text(`Rp${formatRupiah(purchaseTotal)}`);

  $('input[name="purchase[total]"]').val(purchaseTotal);
  $('input[name="purchase[quantity]"]').val(purchaseQuantity);

  $('.btn-block').attr('disabled', false);

  purchaseForm = true;

}

function inputPurchaseProductDetailChange() {

  let productNameElements = $('#purchase-detail-table').find('.purchase-product-name'),
    productIdElements = $('#purchase-detail-table').find('.purchase-product-id'),
    productQuantityElements = $('#purchase-detail-table').find('.purchase-product-qty'),
    productPriceElements = $('#purchase-detail-table').find('.purchase-product-price');

  $.each(purchaseDetail, (key, value) => {
    purchaseDetail[key].product_id = productIdElements.eq(key).val();
    purchaseDetail[key].product_name = productNameElements.eq(key).text();
    purchaseDetail[key].product_quantity = productQuantityElements.eq(key).val();
    purchaseDetail[key].product_price = productPriceElements.eq(key).val();
  });

  resetLsPurchaseDetail();

  initPurchaseDetailTable();

}

function addPurchaseDetail() {

  if (parseFloat(getLsSize().total) > 4500) {
    $('#ls-over').removeClass('d-none');
    return true;
  }

  $('#ls-over').addClass('d-none');

  let formValue = getPurchaseAddFormValue();

  if (purchaseDetail.length > 0) {
    updatePurchaseDetail(formValue);
  } else {
    purchaseDetail.push(formValue);
  }

  resetLsPurchaseDetail();

  initPurchaseDetailTable();

}

function resetLsPurchaseDetail() {
  localStorage.removeItem(LS_PURCHASE_NAME);
  localStorage.setItem(LS_PURCHASE_NAME, JSON.stringify(purchaseDetail));
}

function updatePurchaseDetail(formValue) {

  let update = false;

  $.each(purchaseDetail, (key, value) => {
    if (value.product_id === formValue.product_id) {

      purchaseDetail[key].product_quantity = 
        parseInt(formValue.product_quantity) + 
        parseInt(purchaseDetail[key].product_quantity);

      purchaseDetail[key].product_price = 
        parseInt(formValue.product_price) + 
        parseInt(purchaseDetail[key].product_price);

      update = true;

    }

  });

  if (!update) {
    purchaseDetail.push(formValue);
  }

}

function getPurchaseAddFormValue() {
  return {
    'product_id': 
      $('#purchase-product-form')
        .find('.select2bs4')
        .children('option:selected')
        .val(),
    'product_price': 
      $('#purchase-product-form')
        .find('.select2bs4')
        .children('option:selected')
        .attr('data-price'),
    'product_name': 
      $('#purchase-product-form')
        .find('.select2bs4')
        .children('option:selected')
        .attr('data-name'),
    'product_quantity':
      $('#purchase-product-form')
        .find('.text-center')
        .val(),
  };
}

function deletePurchaseDetail(button) {
  
  $.each(purchaseDetail, (key, value) => {

    if (value.product_id === button.attr('data-id')) {
      purchaseDetail.splice(key, 1);
    }

  });

  resetLsPurchaseDetail();

  initPurchaseDetailTable();

}

function deleteAllPurchaseDetail() {
  purchaseDetail = [];

  resetLsPurchaseDetail();

  initPurchaseDetailTable();
}

function destroyPurchaseDetailTable() {
  $("purchase-detail-table").addClass('d-none');
}

$(document).ready(() => {

  if (!lsTest()) {
    $('#ls-alert').removeClass('d-none');
  }

  const PURCHASE_PAGE_READY = initPurchaseDetail();

  $('#purchase-product-form').submit(function (e) {
    e.preventDefault();

    if (PURCHASE_PAGE_READY) {
      addPurchaseDetail();
    }
  });

  $('#purchase-detail-table').on('click', '.purchase-product-delete', function (e) {

    e.preventDefault();
  
    if (PURCHASE_PAGE_READY) {
      deletePurchaseDetail($(this));
    }

  });

  $('#purchase-detail-table').on('click', '#delete-all-purchases', function (e) {

    e.preventDefault();
  
    if (PURCHASE_PAGE_READY) {
      deleteAllPurchaseDetail();
    }

  });

  $('#purchase-detail-table').on('change', '.purchase-product-qty', function (e) {
  
    if (PURCHASE_PAGE_READY) {

      if (parseInt($(this).val()) < 1 || $(this).val() === '' || isNaN(parseInt($(this).val()))) {
        $(this).val('1');
      } else {
        $(this).val(parseInt($(this).val()));
      }

      inputPurchaseProductDetailChange();
    }

  });

  $('#purchase-detail-table').on('change', '.purchase-product-price', function (e) {
  
    if (PURCHASE_PAGE_READY) {

      if (parseInt($(this).val()) < 0 || $(this).val() === '' || isNaN(parseInt($(this).val()))) {
        $(this).val('0');
      } else {
        $(this).val(parseInt($(this).val()));
      }

      inputPurchaseProductDetailChange();
    }

  });

  $('#add-purchase-form').submit(function (e) {
    if (!purchaseForm) {
      e.preventDefault();
    }
  });

});