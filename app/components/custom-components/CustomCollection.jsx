import React from 'react'
import {Suspense} from 'react';
import {Await} from '@remix-run/react';
import {
    Money,
    VariantSelector,
    getSelectedProductOptions,
    CartForm,
  } from '@shopify/hydrogen';
import {defer, redirect} from '@shopify/remix-oxygen';
import {useLoaderData, Link} from '@remix-run/react';
import {json} from '@shopify/remix-oxygen';
import {Pagination, getPaginationVariables, Image} from '@shopify/hydrogen';

import {AddToCartButton} from '@shopify/hydrogen-react';

const CustomCollection = () => {
    const collections = customcollectiondata
    
  return (
    <div className='custom-collection'>
          <div className="number-wrapper">
            <span className="number">2</span>
          </div>
          <div className='custom-collection-wrapper'>
            <h1 className="underline-text text-red-500">SELECT YOUR MEATS</h1>
            <main className="main-section">
                    <CollectionsGrid collections={collections}/>
                <div className='custom-cart'>
                    <div className="title">
                        <h3 className="title">Subscribers Save 25% on Orders</h3>
                        <p className="desc">Applied at checkout</p>
                    </div>


                </div>
            </main>
          </div>
        
    </div>
  )
}

export default CustomCollection



const customcollectiondata = [
    {
        "id": "gid://shopify/Product/8249959383266",
        "handle": "smoked-texas-brisket",
        "title": "Smoked Texas Brisket",
        "featuredImage": {
            "id": "gid://shopify/ProductImage/40035512615138",
            "altText": null,
            "url": "https://cdn.shopify.com/s/files/1/0672/4776/7778/files/smoked-texas-brisket-409355.png?v=1702931384",
            "width": 1350,
            "height": 2048
        },
        "priceRange": {
            "minVariantPrice": {
                "amount": "22.95",
                "currencyCode": "USD"
            },
            "maxVariantPrice": {
                "amount": "22.95",
                "currencyCode": "USD"
            }
        },
        "variants": {
            "nodes": [
                {
                    "selectedOptions": [
                        {
                            "name": "Title",
                            "value": "Default Title"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": "gid://shopify/Product/8249959448802",
        "handle": "herb-roasted-chicken-breast",
        "title": "Herb Roasted Chicken Breast",
        "featuredImage": {
            "id": "gid://shopify/ProductImage/40035511566562",
            "altText": null,
            "url": "https://cdn.shopify.com/s/files/1/0672/4776/7778/files/herb-roasted-chicken-breast-710882.png?v=1702931383",
            "width": 1350,
            "height": 2048
        },
        "priceRange": {
            "minVariantPrice": {
                "amount": "11.45",
                "currencyCode": "USD"
            },
            "maxVariantPrice": {
                "amount": "11.45",
                "currencyCode": "USD"
            }
        },
        "variants": {
            "nodes": [
                {
                    "selectedOptions": [
                        {
                            "name": "Title",
                            "value": "Default Title"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": "gid://shopify/Product/8249959874786",
        "handle": "pollo-asado",
        "title": "Pollo Asado",
        "featuredImage": {
            "id": "gid://shopify/ProductImage/40035511435490",
            "altText": null,
            "url": "https://cdn.shopify.com/s/files/1/0672/4776/7778/files/pollo-asado-489849.png?v=1702931383",
            "width": 488,
            "height": 741
        },
        "priceRange": {
            "minVariantPrice": {
                "amount": "11.45",
                "currencyCode": "USD"
            },
            "maxVariantPrice": {
                "amount": "11.45",
                "currencyCode": "USD"
            }
        },
        "variants": {
            "nodes": [
                {
                    "selectedOptions": [
                        {
                            "name": "Title",
                            "value": "Default Title"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": "gid://shopify/Product/8249959219426",
        "handle": "sweet-chili-thai-chicken",
        "title": "Sweet Chili Thai Chicken",
        "featuredImage": {
            "id": "gid://shopify/ProductImage/40035512975586",
            "altText": null,
            "url": "https://cdn.shopify.com/s/files/1/0672/4776/7778/files/sweet-chili-thai-chicken-892316.png?v=1702931384",
            "width": 1350,
            "height": 2048
        },
        "priceRange": {
            "minVariantPrice": {
                "amount": "11.45",
                "currencyCode": "USD"
            },
            "maxVariantPrice": {
                "amount": "11.45",
                "currencyCode": "USD"
            }
        },
        "variants": {
            "nodes": [
                {
                    "selectedOptions": [
                        {
                            "name": "Title",
                            "value": "Default Title"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": "gid://shopify/Product/8249959678178",
        "handle": "slow-cooked-pulled-pork",
        "title": "Slow Cooked Pulled Pork",
        "featuredImage": {
            "id": "gid://shopify/ProductImage/40035513041122",
            "altText": null,
            "url": "https://cdn.shopify.com/s/files/1/0672/4776/7778/files/slow-cooked-pulled-pork-286028.png?v=1702931384",
            "width": 1351,
            "height": 2048
        },
        "priceRange": {
            "minVariantPrice": {
                "amount": "13.45",
                "currencyCode": "USD"
            },
            "maxVariantPrice": {
                "amount": "13.45",
                "currencyCode": "USD"
            }
        },
        "variants": {
            "nodes": [
                {
                    "selectedOptions": [
                        {
                            "name": "Title",
                            "value": "Default Title"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": "gid://shopify/Product/8249959186658",
        "handle": "chimichurri-steak",
        "title": "Chimichurri Steak",
        "featuredImage": {
            "id": "gid://shopify/ProductImage/40035515236578",
            "altText": null,
            "url": "https://cdn.shopify.com/s/files/1/0672/4776/7778/files/chimichurri-steak-991376.png?v=1702931392",
            "width": 1350,
            "height": 2048
        },
        "priceRange": {
            "minVariantPrice": {
                "amount": "19.95",
                "currencyCode": "USD"
            },
            "maxVariantPrice": {
                "amount": "19.95",
                "currencyCode": "USD"
            }
        },
        "variants": {
            "nodes": [
                {
                    "selectedOptions": [
                        {
                            "name": "Title",
                            "value": "Default Title"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": "gid://shopify/Product/8249959022818",
        "handle": "carne-asada",
        "title": "Carne Asada",
        "featuredImage": {
            "id": "gid://shopify/ProductImage/40035512582370",
            "altText": null,
            "url": "https://cdn.shopify.com/s/files/1/0672/4776/7778/files/carne-asada-330625.png?v=1702931384",
            "width": 487,
            "height": 729
        },
        "priceRange": {
            "minVariantPrice": {
                "amount": "19.95",
                "currencyCode": "USD"
            },
            "maxVariantPrice": {
                "amount": "19.95",
                "currencyCode": "USD"
            }
        },
        "variants": {
            "nodes": [
                {
                    "selectedOptions": [
                        {
                            "name": "Title",
                            "value": "Default Title"
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": "gid://shopify/Product/8249959121122",
        "handle": "buffalo-chicken-breast",
        "title": "Buffalo Chicken Breast",
        "featuredImage": {
            "id": "gid://shopify/ProductImage/40035512451298",
            "altText": null,
            "url": "https://cdn.shopify.com/s/files/1/0672/4776/7778/files/buffalo-chicken-breast-446440.png?v=1702931384",
            "width": 1347,
            "height": 2048
        },
        "priceRange": {
            "minVariantPrice": {
                "amount": "11.45",
                "currencyCode": "USD"
            },
            "maxVariantPrice": {
                "amount": "11.45",
                "currencyCode": "USD"
            }
        },
        "variants": {
            "nodes": [
                {
                    "selectedOptions": [
                        {
                            "name": "Title",
                            "value": "Default Title"
                        }
                    ]
                }
            ]
        }
    }
]






/**
 * @param {{collections: CollectionFragment[]}}
 */
function CollectionsGrid({collections}) {
    return (
      <div className="collections-grid">
        {collections.map((collection, index) => (
          <CollectionItem
            key={collection.id}
            collection={collection}
            index={index}
          />
        ))}
      </div>
    );
  }
  
  /**
   * @param {{
   *   collection: CollectionFragment;
   *   index: number;
   * }}
   */
  function CollectionItem({collection, index}) {
    console.log(collection, 'item')

    const productAnalytics = {
        productGid: collection.id,
        variantGid: collection.id,
        name: collection.title,
        variantName: collection.title,
        brand: collection.vendor,
        price: 12,
        quantity: 1,
      };
    
    return (
      <Link
        className="collection-item"
        key={collection.id}
        to={`/collections/${collection.handle}`}
        prefetch="intent"
      >
        {collection?.featuredImage && (
          <Image
            alt={collection.featuredImage.altText || collection.title}
            aspectRatio="1/1"
            data={collection.featuredImage}
            loading={index < 3 ? 'eager' : undefined}
          />
        )}
        <h5 class="price">${collection.priceRange.maxVariantPrice.amount}</h5>
{/* 
        <div className='custom-form'>
            <AddToCartButton
              lines={[
                {
                  quantity: 1,
                  merchandiseId: collection.id,
                },
              ]}
              variant="secondary"
              className="mt-1 [background:linear-gradient(270deg,rgb(239,130,80)_0%,rgb(237.22,106.86,97.8)_30.5%,rgb(237,104,100)_64%,rgb(239,130,81)_100%)] w-full font-roman transition-all relative p-2 rounded-[62px] overflow-hidden text-white hover:opacity-90 uppercase"
              analytics={{
                products: [productAnalytics],
                totalValue: parseFloat(productAnalytics.price),
              }}
            >
              {' '}
              Add to Cart
            </AddToCartButton>
        </div> */}

        <div className='custom-form'>
            <button>
                <span className="plus-icon">+</span>
                <span>ADD</span>
                
            </button>
            
        </div>
      </Link>
    );
  }



