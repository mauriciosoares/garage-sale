class Hello extends React.Component {
  componentDidMount() {
    document.querySelectorAll('.carousel').forEach(item => {
      const nextArrow = document.querySelector('#arrow-next-' + item.id)
      const prevArrow = document.querySelector('#arrow-prev-' + item.id)
      if (item.querySelectorAll('img').length === 1) {
        nextArrow.parentNode.removeChild(nextArrow)
        prevArrow.parentNode.removeChild(prevArrow)
        return
      }
      const siema = new Siema({
        selector: '#' + item.id
      });
      nextArrow.addEventListener('click', () => {
        siema.next()
      })

      prevArrow.addEventListener('click', () => {
        siema.prev()
      })
    });

    document.querySelectorAll('.description').forEach(item => {
      item.addEventListener('click', () => {
        const isOpen = item.classList.value.indexOf('open') !== -1
        if (isOpen) {
          item.classList.remove('open')
        } else {
          item.classList.add('open')
        }
      })
    });

    new LazyLoad({
      elements_selector: ".lazy"
    });
  }
  render() {
    return (
      <div className="products">
        {window.products.map((p, i) => (
          <div className="product" key={i}>
            {p.isReserved ? <div className="reserved">This item is Reserved / Sold</div> : null}
            <div className="carousel-holder">
              <div id={`arrow-next-p${i + 1}`} className="arrows arrow-right">
                <img src="next.png" />
              </div>
              <div id={`arrow-prev-p${i + 1}`} className="arrows arrow-left">
                <img src="next.png" />
              </div>
              <div id={`p${i + 1}`} className="carousel">
                {Array(p.images).fill('').map((item, imageIndex) => (
                  <img className="lazy" key={imageIndex} data-src={`images/p${i + 1}${imageIndex + 1}.jpg`} />
                ))}
              </div>
              <div className="description">
                <div className="show">Show Description</div>
                <div className="hide">Hide Description</div>
                <span>{p.description}</span>
              </div>
            </div>
            <div className="details">
              <div className="name">
                {p.name}
              </div>
              <div className="prices">
                <div className="original-price">
                  Paid Price: <span className="red">{p.paidPrice} EUR</span>
                </div>
                <div className="price">
                  Selling Price: <span className="green">{p.sellingPrice} EUR</span>
                </div>
                <div className="link-to-product">
                  {p.storeLink ?
                    <a href={p.storeLink} target="_blank">
                      Link to store where it was bought
                    </a> :
                    <span>No Link</span>
                  }
                </div>
                <div className="availability">
                  Availability: <b className={ p.availability === 'Today' ? 'green' : 'red'}>{p.availability}</b>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

ReactDOM.render(
         <Hello text="World" />,
document.getElementById('root')
);


var modalTinyNoFooter = new tingle.modal();
var btn = document.querySelector('.open-modal');
btn.addEventListener('click', function () {
  modalTinyNoFooter.open();
});
modalTinyNoFooter.setContent(document.querySelector('.modal').innerHTML);
