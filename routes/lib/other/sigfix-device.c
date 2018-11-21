#include "SIGFOX.h"
static const String device = "NOTUSED";
static const bool useEmulator = false;
static const bool echo = true;
static const Country country = COUNTRY_JP;
static UnaShieldV2S transceiver(country, useEmulator, device, echo);
static String response;

void setup() {
  // Ready
  Serial.begin(9600);
  Serial.println(F("Running setup..."));  
  if (!transceiver.begin()){
    stop(F("Unable to init SIGFOX module, may be missing"));
  }

  // test Send
  transceiver.sendMessage("0102030405060708090a0b0c");

  // Wait
  Serial.println(F("Waiting 11 seconds..."));
  delay(11*1000); // Milli seconds
}

void loop() {
  Serial.print("Loop Start");
  static int counter = 0;
  static int successCount = 0;
  static int failCount = 0;
  
  Serial.print(F("\nRunning loop #"));
  Serial.println(counter);

  float temperature;
  float voltage;

  transceiver.getTemperature(temperature);
  transceiver.getVoltage(voltage);

  Message msg(transceiver);
  msg.addField("ctr", counter);
  msg.addField("tmp", temperature);
  msg.addField("vlt", voltage);

  if (msg.send()) {
    successCount++;
  } else {
    failCount++;
  }

  counter++;
  if (counter >= 4) {
    Serial.print("Loop Count 4");
    stop(String(F("Messages sent successfully: ")) + successCount + F(", failed: ") + failCount);
  }

  // Wait
  Serial.println("Waiting 21 seconds...");
  delay(21000);
}

// 0075BE75,920e1e00b051120194592100
//         ,0102030405060708090a0b0c
// 
// counter:2:int:16:little-endian
// temp:6:int:16:little-endian
// vol:10:int:16:little-endian