const settings = {
    gallery: {
        parent:             document.querySelector(".gallery"),
        galleryList:        document.querySelector(".gallery__list"),
    },
    typeWriter: {
        subTitle: document.querySelector(".pageTitle__subtext")
    },
    forms: {
        form:               document.querySelector("[data-validation]"),
        maxLength:          255,
        errorMessage:       'Please input a valid',
        requiredMessage:    'This field is required' ,
        requiredFields:     [   'firstname',
                                'lastname',
                                'course',
                                'phone',
                                'email',
                                'address',
                                'pass'
                            ],
    }
}



export default {
    ...settings
}