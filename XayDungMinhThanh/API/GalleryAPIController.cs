using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using XayDungMinhThanh.Models;

namespace XayDungMinhThanh.API
{
    public class GalleryAPIController : ApiController
    {
        private MinhThanhEntities db = new MinhThanhEntities();

        // GET: api/GalleryAPI
        public IQueryable<Gallery> GetGalleries()
        {
            return db.Galleries;
        }

        // GET: api/GalleryAPI/5
        [ResponseType(typeof(Gallery))]
        public IHttpActionResult GetGallery(int id)
        {
            Gallery gallery = db.Galleries.Find(id);
            if (gallery == null)
            {
                return NotFound();
            }

            return Ok(gallery);
        }

        //GET: API/GalleryAPI?att=...&&value=...
        public IQueryable<Gallery> GetGallery(string att, string value)
        {
            var gallery = db.Galleries;

            //bài viết trang chủ
            if (att == "galleryHome" && att != null && value != null)
            {
                int number = int.Parse(value);
                var model = db.Galleries.Where(p => p.featured == true).Take(number);

                db.Configuration.LazyLoadingEnabled = false;
                db.Configuration.ProxyCreationEnabled = false;

                return model;
            }

            return gallery;
        }

        // PUT: api/GalleryAPI/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutGallery(int id, Gallery gallery)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != gallery.id)
            {
                return BadRequest();
            }

            db.Entry(gallery).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GalleryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/GalleryAPI
        [ResponseType(typeof(Gallery))]
        public IHttpActionResult PostGallery(Gallery gallery)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Galleries.Add(gallery);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = gallery.id }, gallery);
        }

        // DELETE: api/GalleryAPI/5
        [ResponseType(typeof(Gallery))]
        public IHttpActionResult DeleteGallery(int id)
        {
            Gallery gallery = db.Galleries.Find(id);
            if (gallery == null)
            {
                return NotFound();
            }

            db.Galleries.Remove(gallery);
            db.SaveChanges();

            return Ok(gallery);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool GalleryExists(int id)
        {
            return db.Galleries.Count(e => e.id == id) > 0;
        }
    }
}