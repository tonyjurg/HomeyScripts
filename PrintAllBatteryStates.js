// HomeyScript (for HomeyAPIV3Local)
// Print devices capable of reporting battery percentage or power alarm

// Get all devices
const devices = await Homey.devices.getDevices();

FirstLevel=true;
// Loop over all devices
for (const device of Object.values(devices))
{
  DC=device.capabilitiesObj;
  if (DC.measure_battery != null)
  {
    if (FirstLevel) console.log("Devices reporting battery power percentage");
    FirstLevel=false;
    console.log("Power:",DC.measure_battery.value,"%\tLast measurement:",DC.measure_battery.lastUpdated.substring(0,10),"\tDevice:",device.name,device.energyObj.batteries);
  }
}

FirstAlarm=true;
// Loop over all devices
for (const device of Object.values(devices))
{
  DC=device.capabilitiesObj;
  if (DC.alarm_battery != null)
  {
    if (DC.alarm_battery.value== true) 
    {
      if (DC.measure_battery.lastUpdated != null)
        {LastUpdate = DC.measure_battery.lastUpdated.substring(0,10)}
      else
        {LastUpdate = "Never"}
      if (FirstAlarm) console.log("Devices reporting battery power alarms");
      FirstAlarm=false;
      console.log("Alarm:", DC.alarm_battery.value, "\tLast measurement:",LastUpdate, "\tDevice:",device.name);
    }
  }
}

if (FirstLevel && FirstAlarm) console.log("No devices found reporting battery power status or power alarms.");
