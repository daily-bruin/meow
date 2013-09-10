from django.db import models

class SMPost(models.Model):
    slug = models.CharField(max_length=100, null=True, blank=False)
    pub_date = models.DateField(null=True, blank=True)
    pub_time = models.TimeField(null=True, blank=True)
    story_url = models.URLField(max_length=500, null=True, blank=True)
    post_twitter = models.TextField(null=True, blank=True)
    post_facebook = models.TextField(null=True, blank=True)
    section = models.ForeignKey('Section', blank=True)
    pub_ready_copy = models.BooleanField(default=False, help_text="Is this copy-edited?")
    pub_ready_online = models.BooleanField(default=False, help_text="Is this ready to send out?")
    sent = models.BooleanField(default=False, help_text="Sent out? This should never be set manually.")
    
    def __unicode__(self):
        return self.slug

class Section(models.Model):
    name = models.CharField(max_length=100, blank=False)
    twitter_account_handle = models.CharField(max_length=100, null=True, blank=True)
    facebook_account_handle = models.CharField(max_length=100, null=True, blank=True)
    also_post_to = models.ForeignKey('Section', blank=True)
    twitter_access_key = models.CharField(max_length=500, null=True, blank=True)
    twitter_access_secret = models.CharField(max_length=500, null=True, blank=True)
    facebook_key = models.CharField(max_length=500, null=True, blank=True)
    facebook_page_id = models.CharField(max_length=200, null=True, blank=True)
    
    def __unicode__(self):
        return self.name

class MeowSetting(models.Model):
    setting_key = models.CharField(max_length=100, blank=False, unique=True)
    setting_value = models.CharField(max_length=500)
    
    def __unicode__(self):
        return self.setting_key