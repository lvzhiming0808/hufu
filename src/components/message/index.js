let count = 0
var Modal = {
	/**
	 * @param {Function} Vue
	 * @param {{name?: string, id?: string, modals: object, style?: object}} options
	 */
  install: function(Vue, options) {
    var defaultOptions = Object.assign({
      name: '$modal',
      id: 'modal',
      modals: null,
      count: 0,
      style: {
        position: 'fixed',
        right: 0,
        bottom: 0,
        zIndex: 20000
      }
    }, options)

		// set z-index value
    this.zIndex = defaultOptions.style.zIndex
    this.masks = []

		// if no modals
    if (this.isEmpty(defaultOptions.modals)) {
      throw new Error('vuejs-modal plugin have a modals params')
    }

		// page init a modal element
    this.init(defaultOptions.id)

		// modals space
    const modals = Vue.prototype[defaultOptions.name] = {}

		// bind modals
    Object.keys(defaultOptions.modals).forEach(v => {
			/**
			 *
			 *
			 * @param {object} options
			 * @returns
			 */
      modals[v] = options => {
        return new Promise((resolve, reject) => {
          try {
            this.masks.push(new Vue({
              render: h => h(defaultOptions.modals[v], {
                props: options,
                style: Object.assign(defaultOptions.style, {
                  zIndex: this.zIndex,
                  bottom: 100 * count++ + 'px'
                }),
                on: {
                  $ok: function($el, info) {
                    $el.style.display = 'none'
                    resolve({
                      type: 'ok'
                    })
                  },
                  $cancel: function($el, info) {
                    $el.style.display = 'none'
                    reject(info)
                  },
                  $modify: function($el, info) {
                    $el.style.display = 'none'
                    resolve({
                      type: 'modify'
                    })
                  }
                }
              })
            }).$mount('#' + defaultOptions.id))
            this.zIndex += 5
            this.init(defaultOptions.id)
            this.updateItem()
          } catch (error) {
           // console.error('vuejs-modal', error)
          }
        })
      }
    })
  },
  updateItem() {
    const total = this.masks.length
    this.masks.forEach((item, i) => {
      item.$el.style.bottom = 120 * (total - i) + 'px'
    })
    setTimeout(() => {
      this.removeItem()
    }, 5e3)
  },
  removeItem(index) {
    if (this.masks[0]) {
      document.body.removeChild(this.masks[0].$el)
    }
    this.masks = this.masks.filter((item, i) => i !== 0)
  },
	/**
	 * init a modal box
	 *
	 * @param {string} name
	 */
  init(name) {
    var div = document.createElement('div')
    div.setAttribute('id', name || 'modal')
    document.getElementsByTagName('body')[0].appendChild(div)
    setTimeout(() => {
      this.updateItem()
    }, 8e3)
  },
  zIndex: 100000,
  isEmpty: function(object) {
    if (object === null || object === undefined) {
      return true
    }
    for (var i in object) {
      return false
    }
    return true
  }
}

// if vue in window
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Modal)
}

export default Modal
