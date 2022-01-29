import Controller from '@ember/controller';

import {
    inject as service
} from '@ember/service';

import {
    tracked
} from '@glimmer/tracking';

import {
    action
} from '@ember/object';

import {
    later
} from '@ember/runloop';

export default class ApplicationController extends Controller {
    @service store;
    @tracked comment = undefined;

    @action
    saveComment() {
        const promise = this.store.createRecord("comment", {
            message: "Initial message"
        });

        promise.save().then((comment) => {
            this.comment = comment;
        });
    }

    @action
    makeDirty() {
        this.comment.send("becomeDirty");

        // Hack to show the latest values of some of the fields as they don't seem to be tracked.
        // In particular the field
        // this.comment._internalModel.currentState.isDirty
        // is not tracked for some reason and also doesn't seem to be the field that is
        // ultimately used in the code because CUSTOM_MODEL_CLASS is set to true? The value
        // that is used when calculating hasDirtyAttributes is:
        // this.comment.___recordState.isDirty
        // but that doesn't get set to true when the becomeDirty action is called?
        const comment = this.comment;
        this.comment = undefined;

        later(() => {
            this.comment = comment;
        });
    }
}
