import Model, {
    attr
} from '@ember-data/model';

export default class CommentModel extends Model {
    @attr('string') message;
}

// Bug also happens with classic style Model as well.
// export default Model.extend({
//     message: attr('string')
// });