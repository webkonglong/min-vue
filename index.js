class Amz {
  constructor (opt) {
    this._el = document.querySelector(opt.el) || document.body
    this._textDom = this._el.querySelectorAll('[v-text]')
    this._modelDom = this._el.querySelectorAll('[v-model]')
    this._domEvent = this._el.querySelectorAll('[v-onclick]')

    this.eventObj = {}
    Object.assign(this, opt.methods, opt.data)
    this._init()
  }

  _init () {
    this._observe(this)
    this._render()
    this._watch()
    this._addEvent()
  }

  _observe (data) {
    Object.keys(data).forEach(key => {
      this._define(data, key, data[key])
    })
  }

  _define (data, key, val) {
    let self = this

    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: false,
      get () {
        return val
      },
      set (newVal) {
        if (val === newVal) {
          return
        }
        val = newVal
        self._render()
      }
    })
  }

  _render () {
    Array.from(this._textDom).forEach(node => {
      node.innerText = this[node.getAttribute('v-text')]
    })
  }

  _watch () {
    Array.from(this._modelDom).forEach(node => {
      node.addEventListener('keyup', () => {
        this[node.getAttribute('v-model')] = node.value
      })
    })
  }

  _addEvent () {
    Array.from(this._domEvent).forEach(node => {
      node.addEventListener('click', this[node.getAttribute('v-onclick')].bind(this))
    })
  }

  $on (type, fn) {
    if (!this.eventObj[type]) {
      this.eventObj[type] = []
    }
    this.eventObj[type].push(fn)
  }

  $once (type, fn) {
    let key = type + '$once'

    if (!this.eventObj[key]) {
      this.eventObj[key] = fn
    } else {
      throw new Error('严重错误【$once】任务队列还存在' + key + '类型任务')
    }
  }

  $emit() {
    let type = Array.prototype.shift.call(arguments)
    let onFunctions = this.eventObj[type]
    let isOnFunctions = !onFunctions || onFunctions.length === 0
    let onceFunction = this.eventObj[type + '$once']
    let isOnceFunction = !onceFunction || typeof onceFunction !== 'function'

    if (isOnFunctions && isOnceFunction) {
      return false
    }

    if (!isOnFunctions) {
      for (let i = 0, fn; fn = onFunctions[i++];) {
        fn.apply(this, arguments)
      }
    }

    if (!isOnceFunction) {
      onceFunction.apply(this, arguments)
        delete this.eventObj[type + '$once']
    }
  }

  $off (type ,fn) {
    let functions = this.eventObj[type]

    if (!functions) {
      return
    }

    if (!fn) {
      functions && (functions.length = 0)
    } else {
      for (let i = 0, _fn; _fn = functions[i++];) {
        if (_fn ===  fn) {
          functions.splice(1, 1)
        }
      }
    }

  }
}
