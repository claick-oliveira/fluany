import React from 'react';
import { removePackage } from '../../actions/pack';
import * as translator from '../../../shared/constants/internacionalization';

const Delete = ({
	dispatch,
	packageid
}) => {

	const handleRemovePack = (e) => {
    // Prevents the event from bubbling up the DOM tree, preventing any parent handlers from being notified of
    // the event.
    e.stopPropagation();
		dispatch(removePackage(packageid));
	};

	return (
	 <div className="setting-trash" onClick={handleRemovePack} title={ translator.PACK_DELETE_LABE  }>
			<svg className="trash-icon" >
				<use xlinkHref="#icon-trash"></use>
			</svg>
		</div>
	);
}

const {
    func, string
} = React.PropTypes;

Delete.propTypes = {
    dispatch: func.isRequired,
}

export default Delete;
