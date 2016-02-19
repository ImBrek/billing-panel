import {searchShow,searchStart} from 'actions/infoBlocks/search';
import {BLOCK_ID} from 'actions/infoBlocksManager';
import {CALL_API} from 'middleware/api';

describe('actions infoBlocks search', () => {
    it('searchShow, payload include blockId key', function () {
        const action = searchShow();
        expect(action.payload).to.have.property(BLOCK_ID);
    });

    it('searchStart async, generate SEARCH_REQUEST when request has been done', function () {
        const action = searchStart('f', 1);
        expect(action.payload[CALL_API]).not.to.be.null;
        expect(action.payload[BLOCK_ID]).not.to.be.null;
    });
});
