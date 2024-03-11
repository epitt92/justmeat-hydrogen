import React from 'react'

const PlanPicker = () => {

    const checkBox = ( 
      <svg xmlns="http://www.w3.org/2000/svg" width="17.627" height="17.627" viewBox="0 0 17.627 17.627" ariahidden="true" role="presentation" className="svgcolor w-3 h-3 mr-1 text-green-400"><g transform="translate(-16.457 -24.531)"><circle id="Ellipse_46" dataname="Ellipse 46" cx="7.5" cy="7.5" r="7.5" transform="translate(17.788 26.154)" fill="#fff" /><path id="noun_tick_684585" d="M15.413 6.6a8.813 8.813.0 1 0 8.813 8.813A8.805 8.805.0 0 0 15.413 6.6zm4.265 6.986-5.219 5.2a.8.8.0 0 1-.569.244.768.768.0 0 1-.569-.244l-2.579-2.559A.818.818.0 1 1 11.9 15.068l1.99 1.99 4.63-4.63a.809.809.0 0 1 1.158.0A.847.847.0 0 1 19.678 13.586z" transform="translate(9.857 17.931)" fill="currentColor" /></g></svg>
    )

    const review = (
        <div className="display_flex">
        <div className="review_div">
          <svg className="star"  width={24} height={22.8} viewBox="0 12.705 512 486.59" x="0px" y="0px" xmlSpace="preserve" style={{fill: '#EBB932'}}>
            <polygon points="256.814,12.705 317.205,198.566 512.631,198.566 354.529,313.435 414.918,499.295 256.814,384.427 98.713,499.295 159.102,313.435 1,198.566 196.426,198.566" />
          </svg>
          <svg className="star"  width={24} height={22.8} viewBox="0 12.705 512 486.59" x="0px" y="0px" xmlSpace="preserve" style={{fill: '#EBB932'}}>
            <polygon points="256.814,12.705 317.205,198.566 512.631,198.566 354.529,313.435 414.918,499.295 256.814,384.427 98.713,499.295 159.102,313.435 1,198.566 196.426,198.566" />
          </svg>
          <svg className="star" width={24} height={22.8} viewBox="0 12.705 512 486.59" x="0px" y="0px" xmlSpace="preserve" style={{fill: '#EBB932'}}>
            <polygon points="256.814,12.705 317.205,198.566 512.631,198.566 354.529,313.435 414.918,499.295 256.814,384.427 98.713,499.295 159.102,313.435 1,198.566 196.426,198.566" />
          </svg>
          <svg className="star"  width={24} height={22.8} viewBox="0 12.705 512 486.59" x="0px" y="0px" xmlSpace="preserve" style={{fill: '#EBB932'}}>
            <polygon points="256.814,12.705 317.205,198.566 512.631,198.566 354.529,313.435 414.918,499.295 256.814,384.427 98.713,499.295 159.102,313.435 1,198.566 196.426,198.566" />
          </svg>
          <svg className="star" viewBox="0 0 26 26" width={24} height="22.8" fill="#EBB932" stroke="#EBB932" strokeWidth={1}>
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="65%" style={{stopColor: '#EBB932', stopOpacity: 1}} />
                <stop offset="65%" style={{stopColor: '#FFFFFF', stopOpacity: 1}} />
              </linearGradient>
            </defs>
            <path d="M12 1.755l3.511 8.577h8.989l-6.891 5.718 2.816 8.692-7.425-5.628-7.424 5.628 2.816-8.692-6.891-5.718h8.989z" fill="url(#grad)" />
          </svg>
        </div>
        <div className="review_text">
          <span className="reviewtext">1,134 Reviews</span>
        </div>
      </div>
    )
  return (
    <div className='product-page'>
    
    <div className="plan-picker">
      <h1 className="title">Get your meats now</h1>
      <p className="description">
        We guarantee you'll love it or your money back !
      </p>
      <div className="review-section">{review}</div>

      <div className="sfq-wrapper">
        <div className="sfq">
          <div className="number-wrapper">
            <span className="number">1</span>
          </div>
          <h3 className="text">Select Your Frequency</h3>
        </div>
        <div className="subscribe-box">
            <fieldset>
            <label htmlFor="ss" className='subscribe-and-save'>
                <input id='ss' checked="checked" type="radio" name='sub' />
                <div className="subscribe-and-save">
                    <div className="top-section">
                        <div className="title">Subscribe & Save</div>
                        <div className="select">
                            <select name="" id="">
                                <option value="">Every 30 days</option>
                                <option value="">Every 15 days</option>
                            </select>
                        </div>
                    </div>
                    <div className="details">
                        <ul>
                            <li> <span>{checkBox}</span> Save 10% on Future Orders</li>
                            <li> <span>{checkBox}</span> Exclusive Meat Options</li>
                            <li> <span>{checkBox}</span> Customize or Cancel Anytime</li>
                        </ul>
                    </div>
                </div>
            </label>

            <label htmlFor="one-time" className='one-time'>
                <input id='one-time' type="radio" name='sub' />
                <div className="subscribe-and-save">
                    <div className="title">One Time</div>
                </div>
            </label>

            
            </fieldset>
        </div>
      </div>
    </div>
    </div>
  );
}

export default PlanPicker