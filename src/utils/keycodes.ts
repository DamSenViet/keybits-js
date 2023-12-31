// enumerate all possible key codes
enum KeyCode {}

enum KeyCodeTag {}

// Keycodes given names, descriptions, types
interface LabeledKeyCode {
  label: string
  keyCode: KeyCode
  tags: KeyCodeTag[]
  description: string
}

// label the keycodes

// The list of all labeled keycodes
export const labeledKeyCodes: LabeledKeyCode[] = []
