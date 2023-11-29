const request = require('request');
const config = require("../config/config.json");

module.exports = {
    sendWebhook: async (webhookURL, color, title, productDetails) => {
        const keywords = config.keywords;
        const neg_keywords = config.neg_keywords;
        let isKeyword = false;
        let isNegKeyword = false;
        if (keywords.length == 0) {
          isKeyword = true;
        } else {
          keywords.map((e) => {
            if (
              productDetails.product.title
                .toLowerCase()
                .includes(e.toString().toLowerCase())
            ) {
              isKeyword = true;
            }
          });
        }
        if (neg_keywords.length == 0) {
          isNegKeyword = true;
        } else {
          neg_keywords.map((e) => {
            if (
              productDetails.product.title
                .toLowerCase()
                .includes(e.toString().toLowerCase())
            ) {
              isNegKeyword = true;
            }
          });
        }
        if (isKeyword && ! isNegKeyword) {
            try {            
                const embed = {
                    embeds: [{
                        author: {
                            name: `${title} @ ${productDetails.site}`,
                            url: productDetails.site,
                            icon_url: 'https://i.imgur.com/tVeNZix.png'
                        },
                        color: 16777215,
                        title: productDetails.product.title,
                        url: `${productDetails.site}/products/${productDetails.product.handle}`,
                        thumbnail: {
                            "url": productDetails.product.images[0] ? productDetails.product.images[0].src : ''
                        },
                        footer: {
                            icon_url: "https://i.imgur.com/b909qvH.png",
                            text: "JD Monitor | Aqua"
                        },
                        type: 'rich',
                        fields: productDetails.restockedVariants.map((variant) => {
                            return {
                                name: (variant.available) ? `${variant.title}: ${(variant.inventory_quantity) ? variant.inventory_quantity : ''}` : `${variant.title}:`,
                                value: (variant.available) ? `[ATC](${productDetails.site}/cart/${variant.id}:1)` : `OOS - [ATC](${productDetails.site}/cart/${variant.id}:1)`,
                                inline: true
                            }
                        }),
                        timestamp: new Date().toISOString()
                    }]
                }
                // @DEBUG: console.log(embed);

                request.post({
                    url: webhookURL,
                    followAllRedirects: true,
                    simple: false,
                    resolveWithFullResponse: true,
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(embed)
                })
            } catch (webhookError) {
                console.error('WEBHOOK: ' + webhookError.message);
                await new Promise((resolve) => setTimeout(() => resolve(), 5000));
                return module.exports.sendWebhook(webhookURL, color, title, productDetails);
            }
        }
    }
}
