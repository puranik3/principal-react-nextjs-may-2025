import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import FormattedDate from "../../../common/FormattedDate/FormattedDate";

import IWorkshop from "../../../../models/IWorkshop";

import './Item.scss';

const Item = ({ name, imageUrl, location, startDate, endDate, id }: IWorkshop) => {
    return (
        <Card className="w-100 p-3">
            <div className="card-img-top-wrapper">
                <Card.Img variant="top" src={imageUrl} alt={name} className="card-img-top" />
            </div>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                    <div>
                        {location.address}, {location.city}, {location.state}
                    </div>
                    <div>
                        <FormattedDate date={startDate} />
                        <span> - </span>
                        <FormattedDate date={endDate} />
                    </div>
                </Card.Text>
                <Link to={`/workshops/${id}`}>
                    <Button variant="primary">Know more</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};

export default Item;