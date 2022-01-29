import {
    Response
} from 'miragejs';

export default function() {
    this.post('/comments', function(schema, request) {
        return new Response(201, {
            'Content-Type': 'application/json'
        }, JSON.parse(request.requestBody));
    });
}