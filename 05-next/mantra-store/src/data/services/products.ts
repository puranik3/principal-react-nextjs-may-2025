import mongoose from "@/data/init";

const Product = mongoose.model("Product");

export const getProducts = async (page: number = 1) => {
    let inferredPage = 1;

    if (page) {
        if (!isNaN(+page)) {
            inferredPage = +page;
        }
    }

    const count = await Product.countDocuments();

    // Reference: Mongoose docs - https://mongoosejs.com/docs/
    // find is a Mongoose Model method. It returns a Query object.
    // skip(), limit(), select() etc. are Query object methods
    const products = await Product.find()
        .skip((inferredPage - 1) * 10)
        .limit(10)
        .select("-__v -createdAt -updatedAt -description -reviews");

    const mappedProducts = products.map((p) =>
        p.toJSON({ flattenObjectIds: true })
    );

    return {
        count,
        page: inferredPage,
        products: mappedProducts,
    };
};

export const getProductById = async (_id: string) => {
    const product = await Product.findById(_id);

    const serializedProductReviews = product.reviews.map((review) => {
        return {
            ...review.toJSON({ flattenObjectIds: true }),
            date: review.date.toString(),
        };
    });

    return {
        ...product.toJSON({ flattenObjectIds: true }),
        reviews: serializedProductReviews,
    };
};

export const getProductIds = async () => {
    const products = await Product.find().select("_id");
    return products.map((p) => p._id.toString());
};