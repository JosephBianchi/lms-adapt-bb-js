define([
    'core/js/adapt'
], function(Adapt) {

    var NavigationView = Backbone.View.extend({

        className: "navigation",

        initialize: function() {
            this.listenToOnce(Adapt, 'courseModel:dataLoading', this.remove);
            this.listenTo(Adapt, 'router:menu router:page', this.hideNavigationButton);
            this.listenTo(Adapt, 'router:menu router:page', this.hideNextLessonButton);
            this.listenTo(Adapt, 'router:menu router:page', this.hidePrevLessonButton);
            this.template = "navigation";
            this.preRender();
        },

        events: {
            'click [data-event]':'triggerEvent'
        },

        preRender: function() {
            Adapt.trigger('navigationView:preRender', this);
            this.render();
        },

        render: function() {
            var template = Handlebars.templates[this.template];
            this.$el.html(template(
                {
                    _globals: Adapt.course.get("_globals"),
                    _accessibility: Adapt.config.get("_accessibility")
                }
            )).insertBefore('#wrapper');

            _.defer(_.bind(function() {
                Adapt.trigger('navigationView:postRender', this);
            }, this));
            return this;
        },

        triggerEvent: function(event) {
            event.preventDefault();
            var currentEvent = $(event.currentTarget).attr('data-event');
            Adapt.trigger('navigation:' + currentEvent);
        },

        hideNavigationButton: function(model) {
            if (model.get('_type') === "course" || model.get('_id') === '5b241aea7c4380c30435cdb2') {
                $('.navigation-back-button, .navigation-home-button').addClass('display-none');
            } else {
                this.showNavigationButton();
            }
        },

        // custom code
        hideNextLessonButton: function(model) {
            if (model.get('_type') === "course" || model.get('_id') === '5b241aea7c4380c30435cdb1' || model.get('_id') === '5b241aea7c4380c30435cdb2' || model.get('_id') === 'co-50') {
              $('.navigation-next-button').addClass('display-none');
            } else {
              this.showNavigationButton();
            }
        },

        hidePrevLessonButton: function(model) {
            if (model.get('_type') === "course" || model.get('_id') === '5b241aea7c4380c30435cdb1' || model.get('_id') === '5b241aea7c4380c30435cdb2' || model.get('_id') === '5b241aea7c4380c30435cdb5') {
              $('.navigation-prev-lesson-button').addClass('display-none');
            } else {
              this.showNavigationButton();
            }
        },


        showNavigationButton: function() {
            $('.navigation-back-button, .navigation-home-button, .navigation-next-button, .navigation-prev-lesson-button').removeClass('display-none');
        }

    });

    return NavigationView;

});
