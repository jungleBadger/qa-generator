"use strict";

module.exports = {
  init: function (app, passport, orchestrator) {
    app.log.info("Initializing API routes");

    // Define routes
    app.get("/api", passport.middlewares.ensureAuthAPI, async (req, res) => {
      return await orchestrator.process(
        "freestar\n" +
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum dapibus efficitur aliquet. Maecenas tempor lorem vel porta sagittis. Pellentesque porta scelerisque tempor. Suspendisse auctor est lacus, id eleifend augue faucibus finibus. Praesent tellus enim, porta non imperdiet ornare, posuere vel elit. Praesent id arcu sagittis, pellentesque metus vel, pellentesque magna. Donec gravida nibh id sapien dignissim facilisis.\n" +
          "\n" +
          "Sed consectetur mattis purus et sagittis. Nulla facilisis semper justo vitae blandit. Mauris porta aliquet faucibus. Curabitur pellentesque magna elit, id luctus justo gravida eu. Aliquam rutrum est vehicula leo porttitor, eu vulputate erat tincidunt. Donec pellentesque facilisis leo, vitae suscipit nisi rutrum sed. Proin fringilla ornare ullamcorper. Phasellus a eros magna. Sed ornare eros ut velit maximus, ultricies ultrices ligula placerat. Nullam ullamcorper, nisl sed vestibulum vestibulum, tortor enim tempor est, eget scelerisque dui orci non risus. Sed eu libero facilisis, feugiat nunc sed, lobortis massa. Donec venenatis interdum lacinia. Vivamus nec faucibus nibh, a pharetra justo.\n" +
          "\n" +
          "Sed dictum vulputate libero, vel facilisis metus faucibus quis. Mauris nisi est, ultricies id purus at, bibendum dictum lacus. Nulla lectus mauris, vestibulum mollis neque eget, consequat vestibulum diam. Etiam volutpat sem in odio luctus, nec dignissim purus maximus. Fusce sed lobortis nisl. Morbi nisi leo, malesuada et ante vitae, viverra pretium mi. Aenean vestibulum ornare dolor blandit ultrices. Cras venenatis turpis quis tristique tristique. Aliquam nec nunc non velit mollis dapibus sed non libero. Aenean non sapien id felis lobortis feugiat. Cras vel accumsan lacus. Morbi vitae orci a diam tempus mollis non ac nibh. Fusce at rhoncus nisi. Ut aliquam lectus condimentum quam venenatis, nec mollis erat dapibus. Etiam diam mauris, sodales quis lacus sit amet, fringilla suscipit elit.\n" +
          "\n" +
          "Mauris dui est, placerat vitae felis sit amet, porttitor ornare quam. Etiam sed elit eu neque dignissim pharetra sit amet ut massa. In lacinia, risus nec blandit convallis, turpis mauris bibendum dolor, id lobortis sapien dolor in libero. Sed felis tellus, bibendum sed felis tincidunt, tincidunt eleifend nisi. Nulla facilisi. Praesent blandit porttitor sollicitudin. Nullam blandit finibus varius. Etiam pretium ex id ante blandit eleifend. In hac habitasse platea dictumst.\n" +
          "\n" +
          "Vivamus vel blandit lacus. Donec consectetur metus felis, in fermentum nisl porttitor sit amet. Phasellus congue turpis ex, a hendrerit neque sodales a. Donec in viverra ligula. Integer finibus scelerisque mi ac elementum. Aenean ullamcorper sagittis velit nec commodo. Curabitur aliquam sagittis dictum. Aenean rutrum massa vitae finibus interdum. Nullam commodo, orci in semper porta, justo nibh tempor neque, a rutrum ex leo quis nulla. Phasellus congue vitae urna in pharetra. Ut tellus leo, convallis eu consectetur vel, interdum at massa. Morbi augue tellus, pulvinar at justo et, pretium posuere ligula. Nulla id diam fringilla, lobortis dolor ac, cursus urna.",
        req.user._id
      );
    });

    return app;
  }
};
