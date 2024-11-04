jQuery(document).ready(function () {
  function addDaysAndFormat(days) {
    const today = new Date();
    const futureDate = new Date(today);
    if (days >= 1) {
      futureDate.setDate(today.getDate() + days);
    } else {
      // Convert fractional days to hours and add
      futureDate.setHours(today.getHours() + days * 24);
    }

    const dd = String(futureDate.getDate()).padStart(2, "0");
    const mm = futureDate.getMonth(); // January is 0
    const yyyy = futureDate.getFullYear();
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return `${days >= 1 ? days + " DAYS" : days * 24 + " HOURS"
      } / ${dd} ${monthNames[mm]}, ${yyyy}`;
  }

  // Function to append options dynamically based on the current date
  function appendDynamicDateOptions() {
    // Define options with direct values for days and fractional for hours
    const options = [20, 15, 12, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0.5, 0.25]; // 0.5 for 12 hours, 0.25 for 6 hours
    const $select = jQuery("#deadline");
    let optionValue = 0;

    options.forEach(function (days, index) {
      const optionText = addDaysAndFormat(days);

      // Assigning specific values based on the order
      if (index < 9) {
        optionValue++;
      } else {
        optionValue += 2;
      }

      $select.append(
        jQuery("<option>", {
          value: optionValue,
          text: optionText,
        })
      );
    });
  }
  // Call the function to append options
  appendDynamicDateOptions();

  // calculate func
  function calculate() {
    var finalCost = 0;
    var pageBaseCost = 0;
    var pptBaseCost = 0;

    // academic level start
    var academicLevel = jQuery("#academic_level").val();
    if (academicLevel == "High School") {
      pageBaseCost = 3;
    } else if (academicLevel == "A-Level / College") {
      pageBaseCost = 5;
    } else if (academicLevel == "Undergraduate / Diploma") {
      pageBaseCost = 7;
    } else if (academicLevel == "Master") {
      pageBaseCost = 9;
    } else if (academicLevel == "Ph.D") {
      pageBaseCost = 11;
    } else {
      alert("Select Education level");
    }
    // academic level end


    var deadlineVal = jQuery("#deadline").val();
    var noOfPagesVal = jQuery("#number_of_pages").val();

    finalCost = (parseInt(pageBaseCost) + parseInt(deadlineVal)) * noOfPagesVal;


    if (academicLevel == "High School") {
      pptBaseCost = 4;
    } else if (academicLevel == "A-Level / College") {
      pptBaseCost = 5;
    } else if (academicLevel == "Undergraduate / Diploma") {
      pptBaseCost = 6;
    } else if (academicLevel == "Master") {
      pptBaseCost = 7;
    } else if (academicLevel == "Ph.D") {
      pptBaseCost = 8;
    }


    var pptSlidesVal = jQuery("#ppt_slides").val();
    if (pptSlidesVal >= 1) {
      finalCost = (pptBaseCost * parseInt(pptSlidesVal)) + finalCost;
    }

    var noOfPostersVal = jQuery("#no_of_poster").val();
    if (noOfPostersVal >= 1) {
      finalCost = (parseInt(noOfPostersVal) * 50) + finalCost;
    }


    // console.log(finalCost);
    jQuery("#finalCost").html(finalCost);




    // word count start
    jQuery("#wordCounts").html(noOfPagesVal * 250);
    // word count end


    //  cards counter start

    pptSlidesVal >= 1 ? jQuery("#pptSlidesCost").html(pptBaseCost) : jQuery("#pptSlidesCost").html(0);
    noOfPostersVal >= 1 ? jQuery("#perPosterCost").html(50) : jQuery("#perPosterCost").html(0);
    jQuery('#perPageCost').html(pageBaseCost + parseInt(deadlineVal));

    // jQuery("#pptSlidesCost").html(pptBaseCost);


    jQuery('#cf7deadline').val(jQuery('#deadline option:selected').text());
    jQuery('#cf7NoOfPages').val(noOfPagesVal);
    jQuery('#cf7NoPoster').val(noOfPostersVal);
    jQuery('#cf7NoOfCitations').val(jQuery('#no_of_reference').val());
    jQuery('#cf7NoOfPptSlides').val(pptSlidesVal);
    jQuery('#cf7FinalCost').val(finalCost);

    // modal pirce

    jQuery("#stripePrice").html(finalCost);

  }

  jQuery("#academic_level").on("change", function () {
    calculate();
  });

  jQuery("#deadline").on("change", function () {
    calculate();
  });


  jQuery(".increment").on("click", function () {
    var input = jQuery(this).siblings('input[type="number"]');
    var currentValue = parseInt(input.val());
    var maxValue = parseInt(input.attr("max"));

    if (currentValue < maxValue) {
      input.val(currentValue + 1);
      calculate(); // Call your calculate function here if needed
    }
  });

  jQuery(".decrement").on("click", function () {
    var input = jQuery(this).siblings('input[type="number"]');
    var currentValue = parseInt(input.val());
    var minValue = parseInt(input.attr("min"));

    if (currentValue > minValue) {
      input.val(currentValue - 1);
      calculate(); // Call your calculate function here if needed
    }
  });

  // file start
  jQuery("#file").attr("multiple", "multiple");
  jQuery("#file").on("change", function () {
    var files = jQuery(this)[0].files;
    jQuery("#filesNames").empty(); // Clear previous file names

    if (jQuery(this)[0].files.length === 0) {
      jQuery("#filesNames").addClass("d-none");
    } else {
      jQuery("#filesNames").removeClass("d-none");
    }

    jQuery.each(files, function (index, file) {
      var listItem = jQuery("<li>" + file.name + "</li>"); // Create list item
      var removeBtn = jQuery('<button type="button" class="btn btn-primary">Remove</button>'); // Create remove button

      // Event handler for remove button
      removeBtn.on("click", function () {
        jQuery(this).parent().remove(); // Remove list item when button is clicked
      });

      listItem.append(removeBtn); // Append remove button to list item
      jQuery("#filesNames").append(listItem); // Append list item to file names list
    });
  });




  jQuery('#servicesSubmitBtn').on('click', function (e) {
    var currentURL = window.location.href;
    if (!currentURL.includes('/order-now')) {
      if (jQuery('#academic_level option:selected').text() != 'Select Education Level') {
        sessionStorage.setItem('servicePaperType', jQuery('#servicePaperType option:selected').val());
        sessionStorage.setItem('serviceAcademicLevel', jQuery('#academic_level option:selected').text());
        sessionStorage.setItem('serviceNoOfPages', jQuery('#number_of_pages').val());
        sessionStorage.setItem('serviceDeadline', jQuery('#deadline option:selected').val());

        sessionStorage.setItem('isFormSubmited', true);
        window.location.href = 'order-now';
      } else {
        calculate();
      }
    }
  });

  if (sessionStorage.getItem('isFormSubmited') && window.location.href.includes('/order-now')) {
    jQuery("#paperType").val(sessionStorage.getItem('servicePaperType'));
    jQuery("#academic_level").val(sessionStorage.getItem('serviceAcademicLevel'));
    jQuery("#number_of_pages").val(sessionStorage.getItem('serviceNoOfPages'));
    jQuery("#deadline").val(sessionStorage.getItem('serviceDeadline'));

    sessionStorage.setItem('isFormSubmited', false);

    calculate();
  }


  // stripe payment start


  // var stripe = Stripe('pk_test_51P8d3nC6FheMBjXn0r28gOnLmZZPYsZQoezgEfHqjpqNm92yBYAkf6DNdtyjv2jx68CuO0KSJKZ4EiTazzQ8eKd7006XDxhD0p');

  //   // Create an instance of Elements
  //   var elements = stripe.elements();

  //   // Create a Card Element
  //   var cardElement = elements.create('card');

  //   // Mount the Card Element to the DOM
  //   cardElement.mount('#card-element');

  //   // Handle form submission
  //   jQuery('#payment-form').submit(function(event) {
  //     event.preventDefault();

  //     // Retrieve the payment amount from the form (replace with your logic)
  //     var amount = 1000; // $10.00 (in cents)

  //     // Create a payment intent on the server
  //     jQuery.ajax({
  //       url: 'http:localhost:3000/payment',
  //       method: 'POST',
  //       contentType: 'application/json',
  //       data: JSON.stringify({ amount: amount }),
  //       success: function(data) {
  //         // Confirm the payment on the client-side
  //         stripe.confirmCardPayment(data.clientSecret, {
  //           payment_method: {
  //             card: cardElement
  //           }
  //         }).then(function(result) {
  //           if (result.error) {
  //             console.error(result.error.message);
  //             // Handle payment failure
  //           } else {
  //             console.log('Payment successful!');
  //             // Handle payment success
  //           }
  //         });
  //       },
  //       error: function(xhr, status, error) {
  //         console.error('Error creating PaymentIntent:', error);
  //       }
  //     });
  //   });
});
