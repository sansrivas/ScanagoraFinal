var ERRORS_KEY = 'registrationpageErrors';

Template.registrationpage.onCreated(function() {
    Session.set(ERRORS_KEY, {});
});


Template.registrationpage.helpers({
    errorMessages: function() {
        return _.values(Session.get(ERRORS_KEY));
    },
    errorClass: function(key) {
        return Session.get(ERRORS_KEY)[key] && 'error';
    }
});

Template.registrationpage.events({
    'submit': function(event, template) {
        event.preventDefault();


        var firstname= template.$('[name=firstname]').val();
        var lastname= template.$('[name=lastname]').val();
        var company= template.$('[name=company]').val();
        var street= template.$('[name=street]').val();
        var city= template.$('[name=city]').val();
        var state= template.$('[name=state]').val();
        var zip= template.$('[name=zip]').val();
        var email = template.$('[name=email]').val();
        var password = template.$('[name=password]').val();
        var confirm = template.$('[name=confirm]').val();


        var errors = {};

        if (! firstname) {
            errors.firstname = 'Please enter your First Name';
        }

        if (! lastname) {
            errors.lastname = 'Please enter your Last Name';
        }

        if (! company) {
            errors.company = 'Please enter your Company';
        }
        if (! street) {
            errors.street = 'Please enter your Street Address';
        }
        if (! city) {
            errors.city = 'Please enter your City';

        }

        if (! state) {
            errors.state = 'Please enter your State';
        }
        if (! zip) {
            errors.zip = 'Please enter your Zip Code';
        }
        if (! email) {
            errors.email = 'Email required';
        }

        if (! password) {
            errors.password = 'Password required';
        }

        if (confirm !== password) {
            errors.confirm = 'Please confirm your password';

        }

        Session.set(ERRORS_KEY, errors);
        if (_.keys(errors).length) {
            return;
        }

        Accounts.createUser({
            email: email,
            password: password,
            firstname: firstname,
            lastaname: lastname,
            company: company,
            street: street,
            city: city,
            state: state,
            zip: zip


        }, function(error) {
            if (error) {
                return Session.set(ERRORS_KEY, {'none': error.reason});
            }

            Router.go('/package');
        });
    }
});