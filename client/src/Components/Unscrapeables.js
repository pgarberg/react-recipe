import React, { useContext } from "react";
import unscrapeableContext from "../Context/Unscrapeables/unscrapeableContext";

export const Unscrapeables = () => {
  const { sites } = useContext(unscrapeableContext);

  const stillUnscrapeable = (site) => {
    switch (site.schemaConstructed) {
      case true:
        return "list-group-item-success";

      case false:
        return "list-group-item-danger";

      default:
        return "";
    }
  };

  const stillUnscrapeablePill = (site) => {
    switch (site.schemaConstructed) {
      case true:
        return "badge-success";

      case false:
        return "badge-danger";

      default:
        return "";
    }
  };
  // //    url: {
  //     type: String,
  //     required: true
  //   },
  //   schemaConstructed: {
  //     type: Boolean,
  //     required: true
  //   },
  //   numberOfAttempts: {
  //     type: Number,
  //     required: true
  //   }
  return (
    <div className="container">
      <h2 className="tas">Unscrapable Websites</h2>
      <hr />
      {sites && (
        <ul class="list-group list-group-flush">
          {sites.map((site) => {
            return (
              <li
                className={`list-group-item ${stillUnscrapeable(
                  site
                )} d-flex justify-content-between align-items-center w-50`}
              >
                <a href={site.url}>{site.url}</a>
                <span
                  className={`badge ${stillUnscrapeablePill(site)} badge-pill`}
                >
                  {site.numberOfAttempts}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
