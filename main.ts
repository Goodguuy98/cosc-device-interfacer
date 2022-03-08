// Used in clapSet.
let clpPref = "None"
// The radio communicates in group 1.
radio.setGroup(1)
// List of usable ports
let periphPorts = [DigitalPin.P0, DigitalPin.P1, DigitalPin.P2]
// Makecode is poor at supporting dictionaries. We must instead use lists of equal lengths
let periphKeys = ["Lig", "Cur", "Doo"]
// The state of each peripheral. The Microbit is not consistent at reading pins,
// So we must record its state.
let periphState = [0, 0, 0]
// A string is radio'd
function on_received_string(req: string) {
    // We take all the data we need from the formatted string
    let dev = req.slice(0, 3)
    let mod = req.slice(3, 6)
    let par = req.slice(6)
    // The requested function is 'switch'
    if (mod == "Swi") {
        switch_(dev, par)
    } else if (mod == "Clp") {
        // The requested function is 'clap'
        clapSet(dev, par)
    }
    
}

function switch_(device: string, state: string) {
    let targetPort: number;
    let targetIndex: number;
    let binary: number;
    
    if (device == "None") {
        return
    }
    
    // MakeCode does not play nice with dictionaries, so I'm forced to use strange methods.
    for (let index = 0; index < 2; index++) {
        if (periphKeys[index] == device) {
            targetPort = periphPorts[index]
            targetIndex = index
        }
        
    }
    // Convert string to binary.
    if (state == "On") {
        binary = 1
    } else if (state == "Off") {
        binary = 0
    }
    
    // Convert string to binary.
    // Check if a valid binary value was made
    if (binary == 1 || binary == 0) {
        // Set pin to binary value
        pins.digitalWritePin(targetPort, binary)
        // Store the peripherals state for future toggles (via clap)
        periphState[targetIndex] = binary
        // Notify website a toggle was made.
        serial.writeLine(device + "Swi" + state)
    } else if (state == "Toggle") {
        // Toggle beg------------------------------------------------------------------------------------
        // Used in case of clap.
        // If the device is off, turn it on.
        if (periphState[targetIndex] == 0) {
            pins.digitalWritePin(targetPort, 1)
            periphState[targetIndex] = 1
            serial.writeLine(device + "SwiOn")
            radio.sendString(device + "SwiOn")
        } else {
            // and vice versa
            pins.digitalWritePin(targetPort, 0)
            periphState[targetIndex] = 0
            serial.writeLine(device + "SwiOff")
            radio.sendString(device + "SwiOff")
        }
        
    }
    
}

// Toggle end------------------------------------------------------------------------------------
// For changing clap preference
function clapSet(device: string, state: string) {
    
    // Request turned clapPref off.
    if (state == "Off") {
        clpPref = "None"
    } else if (state == "On") {
        // Request turned clapPref on for a given device.
        clpPref = device
    }
    
}

// Turn off via onboard
input.onButtonPressed(Button.A, function on_button_pressed_a() {
    switch_("Lig", "Off")
})
// Turn on via onboard
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    switch_("Lig", "On")
})
basic.forever(function on_forever() {
    // Radio:bit activation-----------------------
    radio.onReceivedString(on_received_string)
    // Clap activation---------------------------------
    input.onSound(DetectedSound.Loud, function on_sound_loud() {
        switch_(clpPref, "Toggle")
        return
    })
    // Serial activation--------------------------------------------------------------
    serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function on_data_received() {
        let req = serial.readUntil(serial.delimiters(Delimiters.NewLine))
        on_received_string(req)
    })
    // Onboard activation-------------------------------------------------------------
    if (input.buttonIsPressed(Button.A)) {
        switch_("Lig", "Off")
    }
    
    if (input.buttonIsPressed(Button.B)) {
        switch_("Lig", "On")
    }
    
})
basic.showIcon(IconNames.Happy)
