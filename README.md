# Tertim - terminal timer

Tertim is a simple terminal timer that essentially clones `termdown` in JavaScript to avoid `pip` installations. It's not as good as termdown, but it's good enough for me!

## Installation

```bash
$ npm install -g tertim
```

## Usage

```bash
$ tertim 30s                    # Start a 30 second timer
$ tertim 10:30                  # Start a timer until 10:30
$ tertim 17:00 "Workday timer"  # Start a timer until 17:00 with a message
$ tertim 15m "Break timer"      # Start a 15 minute timer with a message
```
