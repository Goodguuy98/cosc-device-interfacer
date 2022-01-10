Serial = ""

radio.set_group(1)
def on_button_pressed_a():
    radio.send_string("LigSwiOn")
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    radio.send_string("LigClpOn")
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_data_received():
    global Serial
    Serial = serial.read_until(serial.delimiters(Delimiters.NEW_LINE))
    radio.send_string(Serial)
serial.on_data_received(serial.delimiters(Delimiters.NEW_LINE), on_data_received)

def on_forever():
    pass
basic.forever(on_forever)
