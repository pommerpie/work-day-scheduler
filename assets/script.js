// VAR START

var date = $("#currentDay")
var times = $(".time-block")
var appt = $('#currentDay')
var saveButton = $('.saveBtn')

// VAR END 

// FUNCTION BEGIN

$(document).ready(function () { /* Innitiates function at load in */
    function startTime() {
        checkTime()
    }
    startTime()
    date.text(dayjs().format('dddd, MMMM, DD')) /* Displays current week day, month */
    var currentHour = parseInt(dayjs().format('H')) /* Grabs current hour */
    function checkTime() {
        times.each(function() { /* Loops through each time block class */
            var id = parseInt($(this).attr('id')) /* Grabs current hour */
            if (id > currentHour) {
              $(this).removeClass('past present future').addClass('future') /* Removes time classes, adds appropriate class */
            } else if (id === currentHour) {
              $(this).removeClass('past present future').addClass('present') /* Removes time classes, adds appropriate class */
            } else if (id < currentHour) {
              $(this).removeClass('past present future').addClass('past') /* Removes time classes, adds appropriate class */
            }
          })
     }
   times.each(function () { /* Loops through the time block class */
     var id = $(this).attr('id')
     var textLoc = $(this).find('textarea')
     var hourTxt = localStorage.getItem(id)
     if (hourTxt) { /* Checks hourTxt content */
      textLoc.text(hourTxt)
     }
   })

   // FUNCTION END 

   // TIME CHECK START

   setInterval(checkTime, 1000) /* Checks time every second */

   // TIME CHECK END

   // SAVE BUTTON START
   
   saveButton.click(function () { /* Adds event listener for every save */
    var id = $(this).parent().attr('id')
    var text = $(this).siblings('textarea')
    var txtVal = text.val()
    localStorage.removeItem(id) /* Removes local storage based on save button's parent ID */
    if (!(txtVal.trim() === '')) { /* Checks if txtVal is empty */
      localStorage.setItem(id, txtVal)
      appt.children().remove('#appendedMessage') /* Removes last append */
      let appendMsg = $('<p>').attr('id', 'appendedMessage').text('Appointment added to LocalStorage! ✓') /* Displays message after save */
      appt.append(appendMsg)
    }
   })

   // SAVE BUTTON END
})