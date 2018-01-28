//Calculate greeting and set on header.
var HoursOfDay = new Date().getHours();
var GreetingMessage = "Hello! ";
if(HoursOfDay >= 0 && HoursOfDay < 12) {
  GreetingMessage = GreetingMessage + "Good Morning";
}
if(HoursOfDay >=12 && HoursOfDay < 17) {
  GreetingMessage = GreetingMessage + "Good Afternoon";
}
if(HoursOfDay >= 17 && HoursOfDay < 24) {
  GreetingMessage = GreetingMessage + "Good Evening";
}
$(".header-greeting").html(GreetingMessage);
