const HARDWARE_DATA = {
  boards: [
    {
      id: "esp32-wroom-32",
      name: "ESP32-WROOM-32",
      vendor: "Espressif Systems",
      category: "microcontroller",
      architecture: "Xtensa 32-bit LX6",
      cores: 2,
      clockSpeed: "240 MHz",
      flash: "4 MB (SPI)",
      sram: "520 KB",
      psram: "None (Optional)",
      operatingVoltage: "3.3V",
      inputVoltage: "5V (USB/VIN)",
      activeCurrent: "80 - 240 mA",
      sleepCurrent: "10 uA (Deep Sleep)",
      wifi: "802.11 b/g/n (2.4 GHz)",
      bluetooth: "v4.2 BR/EDR & BLE",
      gpioCount: 36,
      adcChannels: "18 channels (12-bit SAR)",
      dacChannels: "2 channels (8-bit)",
      pwmPins: "16 independent PWM channels",
      interfaces: {
        uart: 3,
        spi: 3,
        i2c: 2,
        can: 1,
        i2s: 2,
        touch: 10
      },
      summary: "High-performance dual-core microcontroller with integrated Wi-Fi and dual-mode Bluetooth. Industry standard for IoT devices.",
      pros: ["Exceptional compute-to-price ratio", "Extensive RTOS support", "Built-in cryptographic hardware acceleration"],
      cons: ["Non-linear ADC response requiring calibration", "High power spikes during RF transmission"],
      pinout: [
        { pin: 1, name: "3V3", type: "power", desc: "3.3V Power Output" },
        { pin: 2, name: "EN", type: "system", desc: "Chip Enable / Reset (Active High)" },
        { pin: 3, name: "VP / GPIO36", type: "adc", desc: "ADC1_CH0, Input Only" },
        { pin: 4, name: "VN / GPIO39", type: "adc", desc: "ADC1_CH3, Input Only" },
        { pin: 5, name: "GPIO34", type: "adc", desc: "ADC1_CH6, Input Only" },
        { pin: 6, name: "GPIO35", type: "adc", desc: "ADC1_CH7, Input Only" },
        { pin: 7, name: "GPIO32", type: "gpio", desc: "ADC1_CH4, Touch 9, 32K_XP" },
        { pin: 8, name: "GPIO33", type: "gpio", desc: "ADC1_CH5, Touch 8, 32K_XN" },
        { pin: 9, name: "GPIO25", type: "dac", desc: "DAC1, ADC2_CH8, Audio Out" },
        { pin: 10, name: "GPIO26", type: "dac", desc: "DAC2, ADC2_CH9, Audio Out" },
        { pin: 11, name: "GPIO27", type: "gpio", desc: "ADC2_CH7, Touch 7, PWM" },
        { pin: 12, name: "GPIO14", type: "spi", desc: "HSPI_CLK, ADC2_CH6, Touch 6" },
        { pin: 13, name: "GPIO12", type: "spi", desc: "HSPI_MISO, ADC2_CH5, Strapping" },
        { pin: 14, name: "GND", type: "gnd", desc: "Ground Reference" },
        { pin: 15, name: "GPIO13", type: "spi", desc: "HSPI_MOSI, ADC2_CH4, Touch 4" },
        { pin: 16, name: "GPIO9", type: "spi", desc: "Flash D2 (Reserved for Internal SPI)" },
        { pin: 17, name: "GPIO10", type: "spi", desc: "Flash D3 (Reserved for Internal SPI)" },
        { pin: 18, name: "GPIO11", type: "spi", desc: "Flash CMD (Reserved for Internal SPI)" },
        { pin: 19, name: "VIN / 5V", type: "power", desc: "5V External Input Voltage" },
        { pin: 20, name: "GND", type: "gnd", desc: "Ground Reference" },
        { pin: 21, name: "GPIO23", type: "spi", desc: "VSPI_MOSI, Default SPI MOSI" },
        { pin: 22, name: "GPIO22", type: "i2c", desc: "I2C SCL (Wire Default)" },
        { pin: 23, name: "GPIO1", type: "uart", desc: "U0TXD (Default Serial TX)" },
        { pin: 24, name: "GPIO3", type: "uart", desc: "U0RXD (Default Serial RX)" },
        { pin: 25, name: "GPIO21", type: "i2c", desc: "I2C SDA (Wire Default)" },
        { pin: 26, name: "GND", type: "gnd", desc: "Ground Reference" },
        { pin: 27, name: "GPIO19", type: "spi", desc: "VSPI_MISO, Default SPI MISO" },
        { pin: 28, name: "GPIO18", type: "spi", desc: "VSPI_SCK, Default SPI CLK" },
        { pin: 29, name: "GPIO5", type: "spi", desc: "VSPI_CS, Default SPI CS" },
        { pin: 30, name: "GPIO17", type: "uart", desc: "U2TXD (Hardware UART2 TX)" },
        { pin: 31, name: "GPIO16", type: "uart", desc: "U2RXD (Hardware UART2 RX)" },
        { pin: 32, name: "GPIO4", type: "gpio", desc: "ADC2_CH0, Touch 0, PWM" },
        { pin: 33, name: "GPIO0", type: "gpio", desc: "Boot Button / Strapping Pin" },
        { pin: 34, name: "GPIO2", type: "gpio", desc: "On-board LED, Strapping Pin" },
        { pin: 35, name: "GPIO15", type: "gpio", desc: "HSPI_CS, ADC2_CH3, Strapping" },
        { pin: 36, name: "GPIO8", type: "spi", desc: "Flash D1 (Reserved for Internal SPI)" },
        { pin: 37, name: "GPIO7", type: "spi", desc: "Flash D0 (Reserved for Internal SPI)" },
        { pin: 38, name: "GPIO6", type: "spi", desc: "Flash CLK (Reserved for Internal SPI)" }
      ],
      codeSnippets: {
        cpp: `#include <WiFi.h>
#include <Wire.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

void setup() {
  Serial.begin(115200);
  pinMode(2, OUTPUT);
  
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\\nWiFi Connected! IP: " + WiFi.localIP().toString());
}

void loop() {
  digitalWrite(2, HIGH);
  delay(1000);
  digitalWrite(2, LOW);
  delay(1000);
}`,
        python: `import network
import time
from machine import Pin

led = Pin(2, Pin.OUT)
wlan = network.WLAN(network.STA_IF)
wlan.active(True)
wlan.connect('YOUR_SSID', 'YOUR_PASS')

while not wlan.isconnected():
    time.sleep(0.5)

print('Network config:', wlan.ifconfig())

while True:
    led.value(not led.value())
    time.sleep(1)`
      }
    },
    {
      id: "esp32-s3",
      name: "ESP32-S3 DevKitC-1",
      vendor: "Espressif Systems",
      category: "microcontroller",
      architecture: "Xtensa 32-bit LX7 Dual-Core",
      cores: 2,
      clockSpeed: "240 MHz",
      flash: "8 MB (Octal SPI)",
      sram: "512 KB",
      psram: "2 - 8 MB (Octal PSRAM)",
      operatingVoltage: "3.3V",
      inputVoltage: "5V (USB-C)",
      activeCurrent: "90 - 260 mA",
      sleepCurrent: "7 uA (Deep Sleep)",
      wifi: "802.11 b/g/n (2.4 GHz)",
      bluetooth: "Bluetooth 5.0 (LE / Mesh)",
      gpioCount: 45,
      adcChannels: "20 channels (12-bit SAR)",
      dacChannels: "None",
      pwmPins: "8 MCPWM / 8 LEDC PWM",
      interfaces: {
        uart: 3,
        spi: 4,
        i2c: 2,
        can: 1,
        i2s: 2,
        usb: "Native USB 2.0 OTG Full Speed",
        camera: "8-bit/16-bit DVP Interface"
      },
    summary: "Vector instructions AI-accelerated dual-core MCU with native USB OTG, Octal SPI PSRAM, and extensive GPIO.",
    pros: ["Vector instructions for neural network inferencing", "Direct USB-JTAG & USB-CDC on chip", "High memory bandwidth with Octal SPI"],
    cons: ["No onboard DAC peripherals compared to classic ESP32", "Slightly higher unit cost than ESP32-WROOM"],
    pinout: [
        { pin: 1, name: "3V3", type: "power", desc: "3.3V Power Supply" },
        { pin: 2, name: "GPIO0", type: "gpio", desc: "Strapping pin / Boot select" },
        { pin: 3, name: "GPIO1", type: "adc", desc: "ADC1_CH0" },
        { pin: 4, name: "GPIO2", type: "adc", desc: "ADC1_CH1" },
        { pin: 5, name: "GPIO3", type: "adc", desc: "ADC1_CH2" },
        { pin: 6, name: "GPIO4", type: "gpio", desc: "ADC1_CH3, Touch 4" },
        { pin: 7, name: "GPIO5", type: "gpio", desc: "ADC1_CH4, Touch 5" },
        { pin: 8, name: "GPIO6", type: "gpio", desc: "ADC1_CH5, Touch 6" },
        { pin: 9, name: "GPIO7", type: "gpio", desc: "ADC1_CH6, Touch 7" },
        { pin: 10, name: "GPIO8", type: "i2c", desc: "Default I2C SDA" },
        { pin: 11, name: "GPIO9", type: "i2c", desc: "Default I2C SCL" },
        { pin: 12, name: "GPIO10", type: "spi", desc: "FSPI_IO4" },
        { pin: 13, name: "GPIO11", type: "spi", desc: "FSPI_IO5" },
        { pin: 14, name: "GPIO12", type: "spi", desc: "FSPI_IO6" },
        { pin: 15, name: "GPIO13", type: "spi", desc: "FSPI_IO7" },
        { pin: 16, name: "GPIO14", type: "gpio", desc: "ADC2_CH3, Touch 14" },
        { pin: 17, name: "5V", type: "power", desc: "5V VBUS Input" },
        { pin: 18, name: "GND", type: "gnd", desc: "Ground Reference" },
        { pin: 19, name: "GPIO43", type: "uart", desc: "U0TXD" },
        { pin: 20, name: "GPIO44", type: "uart", desc: "U0RXD" },
        { pin: 21, name: "GPIO19", type: "system", desc: "USB D- (Native USB)" },
        { pin: 22, name: "GPIO20", type: "system", desc: "USB D+ (Native USB)" },
        { pin: 23, name: "GPIO21", type: "gpio", desc: "RTC GPIO 21" },
        { pin: 24, name: "GPIO47", type: "gpio", desc: "General Purpose IO" },
        { pin: 25, name: "GPIO48", type: "gpio", desc: "Built-in WS2812 RGB LED" },
        { pin: 26, name: "GPIO45", type: "gpio", desc: "Strapping Pin" },
        { pin: 27, name: "GPIO38", type: "gpio", desc: "General Purpose IO" },
        { pin: 28, name: "GPIO39", type: "system", desc: "JTAG MTCK" },
        { pin: 29, name: "GPIO40", type: "system", desc: "JTAG MTDO" },
        { pin: 30, name: "GPIO41", type: "system", desc: "JTAG MTDI" },
        { pin: 31, name: "GPIO42", type: "system", desc: "JTAG MTMS" },
        { pin: 32, name: "GND", type: "gnd", desc: "Ground Reference" }
      ],
      codeSnippets: {
        cpp: `#include <Arduino.h>

#define LED_PIN 48

void setup() {
  Serial.begin(115200);
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  Serial.println("ESP32-S3 Running...");
  neopixelWrite(LED_PIN, 255, 0, 0);
  delay(500);
  neopixelWrite(LED_PIN, 0, 255, 0);
  delay(500);
  neopixelWrite(LED_PIN, 0, 0, 255);
  delay(500);
}`,
        python: `import machine
import neopixel
import time

np = neopixel.NeoPixel(machine.Pin(48), 1)

while True:
    np[0] = (255, 0, 0)
    np.write()
    time.sleep(0.5)
    np[0] = (0, 255, 0)
    np.write()
    time.sleep(0.5)
    np[0] = (0, 0, 255)
    np.write()
    time.sleep(0.5)`
      }
    },
  {
      id: "raspberry-pi-pico-w",
      name: "Raspberry Pi Pico W",
      vendor: "Raspberry Pi Foundation",
      category: "microcontroller",
      architecture: "ARM Cortex-M0+",
      cores: 2,
      clockSpeed: "133 MHz",
      flash: "2 MB (QSPI)",
      sram: "264 KB",
      psram: "None",
      operatingVoltage: "3.3V",
      inputVoltage: "1.8V - 5.5V (VSYS)",
      activeCurrent: "20 - 95 mA",
      sleepCurrent: "1.3 mA (Dormant)",
      wifi: "CYW43439 802.11n (2.4 GHz)",
      bluetooth: "Bluetooth 5.2 / BLE",
      gpioCount: 26,
      adcChannels: "3 channels (12-bit) + 1 internal temp",
      dacChannels: "None",
      pwmPins: "16 PWM channels (8 slices)",
      interfaces: {
        uart: 2,
        spi: 2,
        i2c: 2,
        pio: "2 blocks with 8 state machines",
        usb: "USB 1.1 Host / Device"
      },
      summary: "Affordable dual-core ARM Cortex-M0+ board featuring custom programmable I/O (PIO) blocks and Wi-Fi/BLE connectivity.",
      pros: ["Flexible Programmable I/O (PIO) hardware state machines", "Ultra low price point", "Broad input voltage range (1.8V to 5.5V)"],
      cons: ["No hardware floating-point unit (FPU)", "Limited RAM for large computer vision tasks"],
      pinout: [
        { pin: 1, name: "GP0", type: "uart", desc: "UART0 TX / I2C0 SDA / PWM0 A" },
        { pin: 2, name: "GP1", type: "uart", desc: "UART0 RX / I2C0 SCL / PWM0 B" },
        { pin: 3, name: "GND", type: "gnd", desc: "Ground" },
        { pin: 4, name: "GP2", type: "spi", desc: "SPI0 SCK / I2C1 SDA / PWM1 A" },
        { pin: 5, name: "GP3", type: "spi", desc: "SPI0 TX / I2C1 SCL / PWM1 B" },
        { pin: 6, name: "GP4", type: "i2c", desc: "I2C0 SDA / SPI0 RX / PWM2 A" },
        { pin: 7, name: "GP5", type: "i2c", desc: "I2C0 SCL / SPI0 CSn / PWM2 B" },
        { pin: 8, name: "GND", type: "gnd", desc: "Ground" },
        { pin: 9, name: "GP6", type: "pwm", desc: "PWM3 A / I2C1 SDA" },
        { pin: 10, name: "GP7", type: "pwm", desc: "PWM3 B / I2C1 SCL" },
        { pin: 11, name: "GP8", type: "uart", desc: "UART1 TX / PWM4 A" },
        { pin: 12, name: "GP9", type: "uart", desc: "UART1 RX / PWM4 B" },
        { pin: 13, name: "GND", type: "gnd", desc: "Ground" },
        { pin: 14, name: "GP10", type: "spi", desc: "SPI1 SCK / PWM5 A" },
        { pin: 15, name: "GP11", type: "spi", desc: "SPI1 TX / PWM5 B" },
        { pin: 16, name: "GP12", type: "spi", desc: "SPI1 RX / PWM6 A" },
        { pin: 17, name: "GP13", type: "spi", desc: "SPI1 CSn / PWM6 B" },
        { pin: 18, name: "GND", type: "gnd", desc: "Ground" },
        { pin: 19, name: "GP14", type: "gpio", desc: "PWM7 A / I2C1 SDA" },
        { pin: 20, name: "GP15", type: "gpio", desc: "PWM7 B / I2C1 SCL" },
        { pin: 21, name: "GP16", type: "spi", desc: "SPI0 RX / UART0 TX" },
        { pin: 22, name: "GP17", type: "spi", desc: "SPI0 CSn / UART0 RX" },
        { pin: 23, name: "GND", type: "gnd", desc: "Ground" },
        { pin: 24, name: "GP18", type: "spi", desc: "SPI0 SCK / PWM1 A" },
        { pin: 25, name: "GP19", type: "spi", desc: "SPI0 TX / PWM1 B" },
        { pin: 26, name: "GP20", type: "i2c", desc: "I2C0 SDA / PWM2 A" },
        { pin: 27, name: "GP21", type: "i2c", desc: "I2C0 SCL / PWM2 B" },
        { pin: 28, name: "GND", type: "gnd", desc: "Ground" },
        { pin: 29, name: "GP22", type: "gpio", desc: "PWM3 A" },
        { pin: 30, name: "RUN", type: "system", desc: "Reset / Enable pin" },
        { pin: 31, name: "GP26", type: "adc", desc: "ADC0 / PWM5 A" },
        { pin: 32, name: "GP27", type: "adc", desc: "ADC1 / PWM5 B" },
        { pin: 33, name: "GND", type: "gnd", desc: "ADC Ground / AGND" },
        { pin: 34, name: "GP28", type: "adc", desc: "ADC2 / PWM6 A" },
        { pin: 35, name: "ADC_VREF", type: "power", desc: "ADC Voltage Reference (3.3V)" },
        { pin: 36, name: "3V3(OUT)", type: "power", desc: "3.3V Regulated Output" },
        { pin: 37, name: "3V3_EN", type: "system", desc: "SMPS Enable Pin" },
        { pin: 38, name: "GND", type: "gnd", desc: "Ground" },
        { pin: 39, name: "VSYS", type: "power", desc: "System Input Voltage (1.8 - 5.5V)" },
        { pin: 40, name: "VBUS", type: "power", desc: "Micro-USB 5V Supply" }
      ],
    codeSnippets: {
        cpp: `#include "pico/stdlib.h"
#include "pico/cyw43_arch.h"

int main() {
    stdio_init_all();
    if (cyw43_arch_init()) {
        return -1;
    }
    
    while (true) {
        cyw43_arch_gpio_put(CYW43_WL_GPIO_LED_PIN, 1);
        sleep_ms(500);
        cyw43_arch_gpio_put(CYW43_WL_GPIO_LED_PIN, 0);
        sleep_ms(500);
    }
}`,
    python: `import time
from machine import Pin
import network

led = Pin("LED", Pin.OUT)

wlan = network.WLAN(network.STA_IF)
wlan.active(True)
wlan.connect('YOUR_SSID', 'YOUR_PASSWORD')

while not wlan.isconnected():
  led.toggle()
  time.sleep(0.2)

print("Pico W Connected IP:", wlan.ifconfig()[0])
led.value(1)`
      }
    },
   {
   id: "rasberry-pi-5",
   name: "Raspberry pi 5",
   vendor: "Raspberry Pi Foundation",
   category: "sbc",
   architecture: "ARM Cortex-A76 (ARMv8.2-A)",
   cores: 4,
   clockSpeed: "2.4 GHz",
   flash: "MicroSD / PCIe NVMe SSD",
   sram: "4 GB / 8 GB / 16 GB LPDDR4X-4267",
   psram: "None",
   operatingVoltage: "5V / 5A (USB-C PD)",
   inputVoltage: "5V DC via USB Type-C",
   activeCurrent: "600 mA - 2.8 A",
   sleepCurrent: "300 mA (Idle standby)",
   wifi: "Dual-band 802.11ac Wi-Fi",
   bluetooth: "Bluetooth 5.0 / BLE",
   gpioCount: 40,
   adcChannels: "None on 40-pin header",
   dacChannels: "None",
   pwmPins: "4 hardware PWM channels",
   interfaces: {
   pcie: "1x PCIe 2.0 x1 lane",
   usb: "2x USB 3.0 (5Gbps), 2x USB 2.0",
   display: "2x 4Kp60 HDMI outputs",
   camera: "2x 4-lane MIPI CSI/DSI transceivers",
   ethernet: "Gigabit Ethernet (with PoE+ support)"
      },

  summary: "Next-generation flagship single board computer offering 2-3x CPU performance over Pi 4, custom RP1 I/O controller, and dedicated PCIe 2.0.",
  pros: ["Desktop-grade CPU with VideoCore VII GPU", "Dedicated PCIe 2.0 expansion header for high-speed NVMe storage", "Power button with RTC battery socket"],
  cons: ["Requires active cooling under continuous workload", "Requires 5V/5A power supply for maximum USB peripheral current"],
  pinout: [
        { pin: 1, name: "3V3 Power", type: "power", desc: "3.3V Output" },
        { pin: 2, name: "5V Power", type: "power", desc: "5V Input/Output" },
        { pin: 3, name: "GPIO2", type: "i2c", desc: "I2C1 SDA" },
        { pin: 4, name: "5V Power", type: "power", desc: "5V Input/Output" },
        { pin: 5, name: "GPIO3", type: "i2c", desc: "I2C1 SCL" },
        { pin: 6, name: "Ground", type: "gnd", desc: "Ground Reference" },
        { pin: 7, name: "GPIO4", type: "gpio", desc: "General Purpose IO / 1-wire default" },
        { pin: 8, name: "GPIO14", type: "uart", desc: "UART0 TX" },
        { pin: 9, name: "Ground", type: "gnd", desc: "Ground reference" },
        { pin: 10, name: "GPIO15", type: "uart", desc: "UART0 RX" },
        { pin: 11, name: "GPIO17", type: "gpio", desc: "General Purpose IO" },
        { pin: 12, name: "GPIO18", type: "pwm", desc:}
]
}