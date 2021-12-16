const InstaGrid = (function () {
  // Utils
  const canvasFactory = () => {
    const canvas = document.createElement('canvas'),
      context = canvas.getContext('2d')

    return {
      canvas,
      context
    }
  }

  const isFunction = func => {
    return func && typeof func === 'function'
  }

  const resetHTML = elem => {
    elem.innerHTML = ''
  }

  const setElemAttrs = (elem, attrs) => {
    Object.keys(attrs).forEach(attr => {
      elem[attr] = attrs[attr]
    })
  }

  const setElemDimensions = (elem, dimensions) => {
    setElemAttrs(elem, dimensions)
  }

  const setElemStyles = (elem, styles) => {
    setElemAttrs(elem.style, styles)
  }

  // InstaGrid

  class InstaGrid {
    constructor(elem, resultClassName) {
      this.elem = elem
      this.resultClassName = resultClassName
      this.container = document.querySelector(resultClassName)
      this.images = []
    }

    _setStyles() {
      setElemStyles(this.container, {
        position: 'relative'
      })
    }

    _readFile(file, onLoadCallback) {
      const reader = new FileReader()
      const { render } = this

      reader.onload = function () {
        if (isFunction(onLoadCallback)) onLoadCallback(reader.result)
      }

      reader.readAsDataURL(file)
    }

    _drawImagePart(image, x, y, width, height, id) {
      const canvasObj = canvasFactory()
      const { canvas, context } = canvasObj
      const position = {
        top: (id < 4 ? '0px' : `${y}px`),
        left: `${x}px`
      }
	

      setElemDimensions(canvas, {
        width,
        height
      })
      setElemAttrs(canvas, {
        id
      })
      setElemStyles(canvas, Object.assign({}, position, {
        position: 'absolute',
        border: '1px solid #fff'
      }))

      context.drawImage(image, x, y, width, height, 0, 0, width, height)

      try {
        this._setImage(canvas.toDataURL(), position)
      } catch (e) { console.warn("[InstaGrid]: Can't pull images out of canvas.", e) }

      this.container.appendChild(canvas)
    }

    _setImage(src, position) {
      this.images.push({
        src,
        position
      })
    }

    render(callback) {
      const image = document.createElement('img')

      image.onload = () => {
        const width = image.width,
          height = image.height

        const partWidth = width / 3,
          partHeight = height / 6

        resetHTML(this.container)

        this._drawImagePart(image, 0, 0, partWidth, partWidth, 1)
        this._drawImagePart(image, partWidth, 0, partWidth, partWidth, 2)
        this._drawImagePart(image, 2 * partWidth, 0, partWidth, partWidth, 3)
        this._drawImagePart(image, 0, partWidth, partWidth, partWidth, 4)
        this._drawImagePart(image, partWidth, partWidth, partWidth, partWidth, 5)
        this._drawImagePart(image, 2 * partWidth, partWidth, partWidth, partWidth, 6)
		this._drawImagePart(image, 0, 2 * partWidth, partWidth, partWidth, 7)
        this._drawImagePart(image, partWidth, 2 * partWidth, partWidth, partWidth, 8)
        this._drawImagePart(image, 2 * partWidth, 2 * partWidth, partWidth, partWidth, 9)
        this._drawImagePart(image, 0, 3 * partWidth, partWidth, partWidth, 10)
        this._drawImagePart(image, partWidth, 3 * partWidth, partWidth, partWidth, 11)
        this._drawImagePart(image, 2 * partWidth, 3 * partWidth, partWidth, partWidth, 12)
		this._drawImagePart(image, 0, 4 * partWidth, partWidth, partWidth, 13)
        this._drawImagePart(image, partWidth, 4 * partWidth, partWidth, partWidth, 14)
        this._drawImagePart(image, 2 * partWidth, 4 * partWidth, partWidth, partWidth, 15)
		this._drawImagePart(image, 0, 5 * partWidth, partWidth, partWidth, 16)
        this._drawImagePart(image, partWidth, 5 * partWidth, partWidth, partWidth, 17)
        this._drawImagePart(image, 2 * partWidth, 5 * partWidth, partWidth, partWidth, 18)
		

        if (isFunction(callback)) callback(this)
      }

      this._readFile(this.elem.files[0], (src) => {
        image.src = src
      })

    }

    getSources() {
      return this.images
    }

  }

  return InstaGrid

})()
