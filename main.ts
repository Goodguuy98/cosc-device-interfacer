// Used in clapSet.
let clpPref = {
    "device" : "None",
}

// A string is radio'd
function switch_(device: string, state: any) {
    let binary: number;
    // Convert string to binary.
    if (state == "On") {
        binary = 1
    } else if (state == "Off") {
        binary = 0
    }
    
    // Convert string to binary.
    // Check if a valid binary value was made
    if (binary == 1 || binary == 0) {
        // Use it to change device state.
        if (device == "Lig") {
            pins.digitalWritePin(DigitalPin.P0, binary)
        }
        
        if (device == "Cur") {
            pins.digitalWritePin(DigitalPin.P1, binary)
        }
        
        if (device == "Doo") {
            pins.digitalWritePin(DigitalPin.P2, binary)
        }
        
    } else if (state == "Toggle") {
        // Toggle beg------------------------------------------------------------------------------------
        // Sadly this code is convuluted as makecode is very difficult to navigate.
        // I attempted to use a dictionary, but they don't appear to behave the same way as in python.
        // When there's an error it's given in javascript terms, which I can't work with.
        // Used in case of clap.
        // The device is light
        if (device == "Lig") {
            // If the device is off, turn it on.
            if (pins.digitalReadPin(DigitalPin.P0) == 0) {
                pins.digitalWritePin(DigitalPin.P0, 1)
            } else {
                pins.digitalWritePin(DigitalPin.P0, 0)
            }
            
        } else if (device == "Cur") {
            // The device is on, turn it off.
            // The device is curtain
            // If the device is off, turn it on.
            if (pins.digitalReadPin(DigitalPin.P0) == 0) {
                pins.digitalWritePin(DigitalPin.P0, 1)
            } else {
                pins.digitalWritePin(DigitalPin.P0, 0)
            }
            
        } else if (device == "Doo") {
            // The device is on, turn it off.
            // The device is Door
            // If the device is off, turn it on.
            if (pins.digitalReadPin(DigitalPin.P0) == 0) {
                pins.digitalWritePin(DigitalPin.P0, 1)
            } else {
                pins.digitalWritePin(DigitalPin.P0, 0)
            }
            
        } else {
            return
        }
        
    }
    
}

// The device is on, turn it off.
// The state is 'None' or invalid.
// Toggle end------------------------------------------------------------------------------------
// For changing clap preference
function clapSet(device: any, state: any) {
    
    // Request turned clapPref off.
    if (state == "Off") {
        clpPref["device"] = "None"
    } else if (state == "On") {
        // Request turned clapPref on for a given device.
        clpPref["device"] = device
    }
    
}

radio.onReceivedString(function on_received_string(req: string) {
    // We take all the data we need from the formatted string
    let dev = req.slice(0, 3)
    let mod = req.slice(3, 6)
    let par = req.slice(0, 6)
    // The requested function is 'switch'
    if (mod == "Swi") {
        
    } else if (mod == "Clp") {
        // The requested function is 'clap'
        
    }
    
})
radio.setGroup(1)
basic.forever(function on_forever() {
    
})
