// Backbone Application View: Certificate Details

define([
    'underscore',
    'underscore.string',
    'gettext',
    'js/views/baseview',
    'js/certificates/models/signatory',
    'js/certificates/views/signatory_details'
],
function(_, str, gettext, BaseView, SignatoryModel, SignatoryDetailsView) {
    'use strict';
    var CertificateDetailsView = BaseView.extend({
        tagName: 'div',
        events: {
            'click .edit': 'editCertificate',
            'click .show-details': 'showDetails',
            'click .hide-details': 'hideDetails'
        },

        className: function () {
            // Determine the CSS class names for this model instance
            var index = this.model.collection.indexOf(this.model);

            return [
                'collection',
                'certificates',
                'certificate-details'
            ].join(' ');
        },

        initialize: function() {
            // Set up the initial state of the attributes set for this model instance
            this.showDetails = true;
            this.template = this.loadTemplate('certificate-details');
            this.listenTo(this.model, 'change', this.render);
        },

        editCertificate: function(event) {
            // Flip the model into 'editing' mode
            if (event && event.preventDefault) { event.preventDefault(); }
            this.model.set('editing', true);
        },

        showDetails: function(event) {
            // Expand the detail view for this item/model
            if (event && event.preventDefault) { event.preventDefault(); }
            this.render(true);
        },

        hideDetails: function(event) {
            // Collapse the detail view for this item/model
            if (event && event.preventDefault) { event.preventDefault(); }
            this.render(false);
        },

        render: function(showDetails) {
            // Assemble the details view for this model
            // Expand to show all model data, if requested
            var attrs = $.extend({}, this.model.attributes, {
                index: this.model.collection.indexOf(this.model),
                showDetails: this.showDetails || showDetails || false
            });
            this.$el.html(this.template(attrs));
            if(this.showDetails || showDetails) {
                var self = this;
                this.model.get("signatories").each(function (modelSignatory) {
                    var signatory_detail_view = new SignatoryDetailsView({model: modelSignatory});
                    self.$('div.signatory-details-list').append($(signatory_detail_view.render().$el));
                });
            }
            return this;
        }
    });
    return CertificateDetailsView;
});
