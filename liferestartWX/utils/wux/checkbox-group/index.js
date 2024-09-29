import baseComponent from '../helpers/baseComponent'
import eventsMixin from '../helpers/eventsMixin'

function getOptions(options = []) {
    return options.map((option, index) => {
        if (typeof option === 'string') {
            return {
                title: option,
                value: option,
                index,
            }
        }
        return {
            ...option,
            index,
        }
    })
}

function getCheckedValues(newVal, oldVal = []) {
    let checkedValues = [...oldVal]
    checkedValues = checkedValues.indexOf(newVal) !== -1 ? checkedValues.filter((n) => n !== newVal) : [...checkedValues, newVal]
    return checkedValues
}

baseComponent({
    useField: true,
    behaviors: [eventsMixin()],
    relations: {
        '../field/index': {
            type: 'ancestor',
        },
        '../checkbox/index': {
            type: 'descendant',
            observer() {
                this.debounce(this.changeValue)
            },
        },
    },
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-checkbox-group',
        },
        cellGroupPrefixCls: {
            type: String,
            value: 'wux-cell-group',
        },
        value: {
            type: Array,
            value: [],
        },
        title: {
            type: String,
            value: '',
        },
        label: {
            type: String,
            value: '',
        },
        options: {
            type: Array,
            value: [],
        },
    },
    data: {
        inputValue: [],
        keys: [],
    },
    observers: {
        value(newVal) {
            if (this.hasFieldDecorator) return
            this.updated(newVal)
            this.changeValue(newVal)
        },
        inputValue(newVal) {
            if (this.hasFieldDecorator) {
                this.changeValue(newVal)
            }
        },
        options(newVal) {
            this.changeValue(this.data.inputValue, newVal)
        },
    },
    methods: {
        updated(inputValue) {
            if (this.data.inputValue !== inputValue) {
                this.setData({ inputValue })
            }
        },
        changeValue(value = this.data.inputValue, options = this.data.options) {
            const showOptions = getOptions(options)
            const elements = this.getRelationNodes('../checkbox/index')
            const keys = showOptions.length > 0 ? showOptions : elements ? elements.map((element) => element.data) : []

            // Elements should be updated when not using the options
            if (!showOptions.length && elements && elements.length > 0) {
                elements.forEach((element, index) => {
                    element.changeValue(Array.isArray(value) && value.includes(element.data.value), index)
                })
            }

            if (this.data.keys !== keys) {
                this.setData({
                    keys,
                })
            }
        },
        onChange(item) {
            const checkedValues = getCheckedValues(item.value, this.data.inputValue)

            // 如果使用 <Field /> 组件包裹时，value 返回值为数组
            if (this.hasFieldDecorator) {
                item.value = checkedValues
            }

            this.triggerEvent('change', {
                ...this.getValue(checkedValues),
                ...item,
                name: this.data.name,
                value: item.value, // 兼容 3.6.1 之前版本，不改变 value
            })
        },
        onCheckboxChange(e) {
            // Set real index
            const { index } = e.currentTarget.dataset
            this.onChange({ ...e.detail, index })
        },
        getValue(value = this.data.inputValue, cols = this.data.keys) {
            const checkedValues = cols.filter((option) => value.includes(option.value))
            const displayValue = checkedValues.map((option) => option.title) || []
            const allValues = cols.map((option) => option.value)
            const selectedIndex = value.map((n) => allValues.indexOf(n))

            return {
                value,
                displayValue,
                selectedIndex,
                selectedValue: value,
                cols,
            }
        },
        getBoundingClientRect(callback) {
            this.cellGroup = this.cellGroup || this.selectComponent('#wux-cell-group')
            return this.cellGroup && this.cellGroup.getBoundingClientRect(callback)
        },
    },
})
